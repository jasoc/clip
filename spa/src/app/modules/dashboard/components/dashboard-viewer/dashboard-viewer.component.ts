
import { AfterViewInit, ChangeDetectorRef, Component, ComponentRef, ElementRef, EventEmitter, Input, Output, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { Dashboard } from '../../classes/IDashboards';
import { geometricNode } from '../../classes/GeometricNode';
import { DashboardService } from '../../dashboard.service';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { WidgetNode } from '../../classes/WidgetNode';
import { WidgetBaseComponent } from '../widgets/base/widget-base.component';

@Component({
  selector: 'clip-dashboard-viewer',
  templateUrl: './dashboard-viewer.component.html',
  styleUrls: ['./dashboard-viewer.component.scss']
})
export class DashboardViewerComponent extends geometricNode implements AfterViewInit {

  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef | null = null;

  gridTemplateColumns: string = '';
  gridTemplateRows: string = '';

  numbers: number[] = [];

  @Input()
  public dashboard: Dashboard | undefined;

  @Output()
  public onDragEndEvent = new EventEmitter();

  @Output()
  public onClickEvent = new EventEmitter();

  @Input('composer-mode')
  public composerMode: boolean = false;

  public spawnedWidgets: WidgetBaseComponent[] = [];

  constructor(private _hostView: ElementRef, private dashboardService: DashboardService, private cd: ChangeDetectorRef) {
    super(_hostView);
  }

  ngAfterViewInit(): void {
    if (this.dashboard) {
      this.renderDashboard();
    }
  }

  renderDashboard(): void {

    if (!this.dashboard) return;

    this.dashboard.height = this.clientHeight;
    this.dashboard.width = this.clientWidth;

    this.numbers = Array(this.dashboard!.columns * this.dashboard!.rows).fill(0);
    this.gridTemplateRows = `repeat(${this.dashboard!.rows}, minmax(0, 1fr))`;
    this.gridTemplateColumns = `repeat(${this.dashboard!.columns}, minmax(0, 1fr))`;

    this.container?.clear();

    this.dashboard.widgetsTree.subComponents?.forEach((componentNode) => {
      this.spawnedWidgets.push(this.dashboardService.spawnWidget(this.container!, {
        widgetNode: componentNode,
        composerMode: true,
        onDragEndEvent: (event) => this.onDragEndEvent.emit(event),
        onClickEvent: (event) => this.onClickEvent.emit(event),
      }).instance);
    });
  }
}
