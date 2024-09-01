import {
  AfterViewInit,
  Component,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import {
  GridstackComponent,
  gsCreateNgComponents,
  NgGridStackOptions,
  NgGridStackWidget,
  GridstackModule,
  nodesCB,
} from 'gridstack/dist/angular';
import { MatButtonModule } from '@angular/material/button';
import { GridStack, GridStackOptions } from 'gridstack';
import { M3TabsComponent } from '../../../../components/m3-tabs/m3-tabs.component';
import { M3TabComponent } from '../../../../components/m3-tabs/m3-tab/m3-tab.component';
import { MatIconModule } from '@angular/material/icon';
import { M3IconComponent } from '../../../../components/m3-icon/m3-icon.component';
import { animate, animateChild, group, query, state, style, transition, trigger } from '@angular/animations';
import { simpleFade } from '../../../../animations/enterAndLeave';
import { DashboardModel, DashboardService } from '../../../../services/dashboard.service';
import { ActivatedRoute } from '@angular/router';
import { BaseClipWidget } from '../../widgets/BaseClipWidget';
import { DynamicFormComponent } from '../../../../components/dynamic-form/dynamic-form.component';
import { DynamicFormElement } from '../../../../components/dynamic-form/types/dynamic-form-element';
import { DropdownElement } from '../../../../components/dynamic-form/types/dynamic-form-element-dropdown';
import { TextboxElement } from '../../../../components/dynamic-form/types/dynamic-form-element-textbox';
import { DynamicFormRoot } from '../../../../components/dynamic-form/types/dynamic-form';
import { CommonModule } from '@angular/common';
import { QuestionControlService } from '../../../../services/question-control.service';

@Component({
  selector: 'clip-dashboards-composer',
  standalone: true,
  templateUrl: './dashboards-composer.component.html',
  styleUrls: ['./dashboards-composer.component.scss'],
  imports: [
    CommonModule,
    GridstackModule,
    MatButtonModule,
    MatIconModule,
    M3TabsComponent,
    M3TabComponent,
    M3IconComponent,
    DynamicFormComponent,
  ],
  providers: [DashboardService],
  animations: [
    trigger('showSiderContent', simpleFade('200ms')),
    trigger('collapseSider', [
      state(
        'true',
        style({
          width: '20px',
          padding: '0px',
        })
      ),
      state(
        'false',
        style({
          width: '340px',
          padding: '16px',
        })
      ),
      transition('true <=> false', [
        group([query('@*', animateChild()), animate('280ms cubic-bezier(0.18, 0.89, 0.32, 1)')]),
      ]),
    ]),
  ],
})
export class DashboardsComposerComponent implements OnInit, AfterViewInit {
  @ViewChildren(GridstackComponent)
  gridComps?: QueryList<GridstackComponent>;
  @ViewChildren(BaseClipWidget)
  widgets?: QueryList<BaseClipWidget<any>>;

  @ViewChild('currentOptionFormOutlet', {
    read: ViewContainerRef,
  })
  currentOptionFormOutlet?: ViewContainerRef;
  @ViewChild('currentOptionFormContent', {
    read: TemplateRef,
  })
  currentOptionFormContent?: TemplateRef<any>;

  public siderCollapsed: boolean = false;
  public dashboard: DashboardModel | undefined;
  public gsWidgetGridBySelector: {
    [id: string]: GridstackComponent;
  } = {};
  public allWidgetsSelector: Array<string> = [];

  public subOptions: NgGridStackOptions = {
    cellHeight: 50,
    column: 'auto',
    acceptWidgets: true,
  };

  public gridOptions: NgGridStackOptions = {
    cellHeight: 50,
    margin: 4,
    minRow: 2,
    acceptWidgets: true,
    subGridDynamic: false,
    subGridOpts: this.subOptions,
  };

  public currentOptionForm?: DynamicFormRoot;
  public currentOptionDefaultValues?: object;

  constructor(
    public dashboardService: DashboardService,
    private route: ActivatedRoute,
    private qcs: QuestionControlService
  ) {
    this.allWidgetsSelector = this.dashboardService.getAllWidgetsSelector();
    this.dashboardService.onWidgetClickInComposerCallback = (w) => this.onWidgetSelectedCallBack(w);
  }

  async ngOnInit(): Promise<void> {
    GridStack.addRemoveCB = gsCreateNgComponents;
  }

  async ngAfterViewInit(): Promise<void> {
    let id = this.route.snapshot.params['id'];
    if (id) {
      this.dashboard = await this.dashboardService.GetDashboard(id);
    }
    if (this.dashboard && this.getMainGridComponent()) {
      GridStack.addGrid(this.getMainGridComponent()!.el, JSON.parse(this.dashboard.json_grid!));
    }
  }

  onGridChangeEvent(event: nodesCB) {
    // TODO use session blocks
    this.saveDashboard();
  }

  onWidgetOptionChanges(widgetOptions: object) {
    if (BaseClipWidget.currentlyHighlighted) {
      BaseClipWidget.currentlyHighlighted.options = widgetOptions;
    }
  }

  getMainGridComponent(): GridstackComponent | undefined {
    if (!this.gridComps || this.gridComps.length < 0) {
      return;
    }
    return this.gridComps.get(0);
  }

  getSelectorGridOptions(selector: string): NgGridStackOptions {
    const widgetInfo = this.dashboardService.getClipWidgetBySelector(selector);
    const minH = widgetInfo.metadata.minH ?? 1;
    const minW = widgetInfo.metadata.minW ?? 1;
    return {
      margin: 5,
      minRow: minH,
      column: minW,
      acceptWidgets: false,
      cellHeight: 40,
      children: [
        {
          w: minW,
          h: minH,
          noMove: true,
          noResize: true,
          selector,
        },
      ],
    };
  }

  addSubGridToDashboard() {
    if (!this.getMainGridComponent()?.el) return;
    this.getMainGridComponent()?.grid?.addWidget({
      h: 2,
      subGridOpts: this.gridOptions,
    } as NgGridStackWidget);
    this.getMainGridComponent()?.grid?.save();
  }

  addToDashboard(selector: string) {
    if (!this.getMainGridComponent()?.el) return;
    const widgetInfo = this.dashboardService.getClipWidgetBySelector(selector);
    this.getMainGridComponent()?.grid?.addWidget({
      h: widgetInfo.metadata.minH,
      w: widgetInfo.metadata.minW,
      selector,
    } as NgGridStackWidget);
    this.getMainGridComponent()?.grid?.save();
  }

  onWidgetSelectedCallBack(widget: BaseClipWidget<any>) {
    widget.highlight();
    const widgetInfo = this.dashboardService.getClipWidgetBySelector(widget.getSelector());
    this.currentOptionForm = widgetInfo.metadata.optionsForm;
    this.currentOptionDefaultValues = widget.options;
    if (this.currentOptionFormOutlet && this.currentOptionFormContent) {
      this.currentOptionFormOutlet.clear();
      this.currentOptionFormOutlet.createEmbeddedView(this.currentOptionFormContent);
    }
  }

  toggleSiderCollapse() {
    this.siderCollapsed = !this.siderCollapsed;
  }

  public saveDashboard() {
    const serializedData = this.getMainGridComponent()?.grid?.save(false, true) as GridStackOptions;
    this.dashboard!.json_grid = JSON.stringify(serializedData);
    this.dashboardService.UpdateDashboard(this.dashboard!.id!, this.dashboard!);
  }
}
