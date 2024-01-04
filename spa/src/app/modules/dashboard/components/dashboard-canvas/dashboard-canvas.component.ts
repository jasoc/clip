
import { OnInit, ChangeDetectorRef, Component, ComponentRef, ElementRef, EventEmitter, Input, Output, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { Dashboard } from '../../classes/IDashboards';
import { geometricNode } from '../../classes/GeometricNode';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'clip-dashboard-canvas',
  templateUrl: './dashboard-canvas.component.html',
  styleUrls: ['./dashboard-canvas.component.scss']
})
export class DashboardCanvasComponent extends geometricNode implements OnInit {

  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef | null = null;

  gridTemplateColumns: string = '';
  gridTemplateRows: string = '';

  numbers: number[] = [];

  @Input()
  public dashboard: Dashboard | undefined;

  @Output()
  public onDragStartEvent = new EventEmitter();

  @Output()
  public onDragEndEvent = new EventEmitter();

  @Output()
  public onClickEvent = new EventEmitter();

  @Input('composer-mode')
  public composerMode: boolean = false;


  constructor(private _hostView: ElementRef, private dashboardService: DashboardService, private cd: ChangeDetectorRef) {
    super(_hostView);
  }

  ngOnInit(): void {
    if (this.dashboard && this.container) {
      this.renderDashboard();
    }
  }

  renderDashboard(composerMode: boolean = false): void {

    if (!this.dashboard) return;

    this.dashboard.height = this.clientHeight;
    this.dashboard.width = this.clientWidth;

    this.numbers = Array(this.dashboard!.columns * this.dashboard!.rows).fill(0);
    this.gridTemplateRows = `repeat(${this.dashboard!.rows}, minmax(0, 1fr))`;
    this.gridTemplateColumns = `repeat(${this.dashboard!.columns}, minmax(0, 1fr))`;

    this.container?.clear();

    this.dashboard.widgetsTree.subComponents?.forEach((componentNode) => {
      this.dashboardService.spawnWidget(this.container!, {
        widgetNode: componentNode,
        composerMode: composerMode,
        dashboardId: this.dashboard!.id!,
        onDragStartEvent: (event) => this.onDragStartEvent.emit(event),
        onDragEndEvent: (event) => this.onDragEndEvent.emit(event),
        onClickEvent: (event) => this.onClickEvent.emit(event),
      });
    });
  }
}
