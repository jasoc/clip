
import { AfterViewInit, ChangeDetectorRef, Component, ComponentRef, ElementRef, Input, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { Dashboard } from '../../classes/IDashboards';
import { geometricNode } from '../../classes/GeometricNode';
import { DashboardService } from '../../dashboard.service';

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

  @Input('composer-mode')
  public composerMode: boolean = false;

  constructor(private _hostView: ElementRef, private dashboardService: DashboardService, private cd: ChangeDetectorRef) {
    super(_hostView);
  }

  ngAfterViewInit(): void {

    if (this.dashboard) {
      this.dashboardService.spawnDashboard(this.dashboard, this);
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

    this.dashboard.widgetsTree.subComponents?.forEach((componentNode) => {
      this.dashboardService.destroyWidget(componentNode);
      let newComponentRef = this.dashboardService.addNodeInContainer(componentNode, this.container!);
      this.dashboardService.cacheWidget(this.dashboard!, componentNode, newComponentRef);
    });
  }
}

