import {
  AfterViewInit,
  Component,
  OnInit,
  QueryList,
  reflectComponentType,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  GridstackComponent,
  gsCreateNgComponents,
  NgGridStackOptions,
  NgGridStackWidget,
  GridstackModule,
} from 'gridstack/dist/angular';
import { MatButtonModule } from '@angular/material/button';
import { GridStack } from 'gridstack';
import { M3TabsComponent } from '../../../../components/m3-tabs/m3-tabs.component';
import { M3TabComponent } from '../../../../components/m3-tabs/m3-tab/m3-tab.component';
import { MatIconModule } from '@angular/material/icon';
import { M3IconComponent } from '../../../../components/m3-icon/m3-icon.component';
import { animate, animateChild, group, query, state, style, transition, trigger } from '@angular/animations';
import { simpleFade } from '../../../../animations/enterAndLeave';
import { DashboardService } from '../../../../services/dashboard.service';

@Component({
  selector: 'clip-dashboards-composer',
  standalone: true,
  templateUrl: './dashboards-composer.component.html',
  styleUrls: ['./dashboards-composer.component.scss'],
  imports: [GridstackModule, MatButtonModule, MatIconModule, M3TabsComponent, M3TabComponent, M3IconComponent],
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
export class DashboardsComposerComponent implements OnInit {
  @ViewChildren(GridstackComponent) gridComps?: QueryList<GridstackComponent>;

  public ids: number = 0;
  public siderCollapsed: boolean = false;

  public gsWidgetGridBySelector: { [id: string]: GridstackComponent } = {};

  public gridOptions: NgGridStackOptions = {
    margin: 5,
    minRow: 1,
    acceptWidgets: true,
    cellHeight: 40,
  };

  public allWidgetsSelector: Array<string> = [];

  constructor(public dashboardService: DashboardService) {
    this.allWidgetsSelector = this.dashboardService.getAllWidgetsSelector();
  }

  ngOnInit(): void {
    GridStack.addRemoveCB = gsCreateNgComponents;
  }

  getMainGridComponent(): GridstackComponent | undefined {
    if (!this.gridComps || this.gridComps.length < 0) {
      return;
    }
    return this.gridComps.get(0);
  }

  public getSelectorGridOptions(selector: string): NgGridStackOptions {
    const widgetInfo = this.dashboardService.getClipWidgetBySelector(selector);
    const minH = widgetInfo.metadata.minH ?? 1;
    const minW = widgetInfo.metadata.minW ?? 1;
    return {
      margin: 5,
      minRow: minH,
      column: minW,
      acceptWidgets: false,
      cellHeight: 40,
      children: [{ w: minW, h: minH, noMove: true, noResize: true, selector }],
    };
  }

  public addToDashboard(selector: string) {
    if (!this.getMainGridComponent()?.el) return;
    this.getMainGridComponent()?.grid?.addWidget({
      h: 3,
      w: 3,
      selector,
    } as NgGridStackWidget);
    this.getMainGridComponent()?.grid?.save();
  }

  toggleSiderCollapse() {
    this.siderCollapsed = !this.siderCollapsed;
  }
}
