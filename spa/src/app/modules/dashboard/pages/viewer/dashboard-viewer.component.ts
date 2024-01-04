import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dashboard } from '../../classes/IDashboards';
import { DashboardService } from '../../dashboard.service';
import { DashboardCanvasComponent } from '../../components/dashboard-canvas/dashboard-canvas.component';

@Component({
  selector: 'clip-dashboard-viewer',
  templateUrl: './dashboard-viewer.component.html',
  styleUrls: ['./dashboard-viewer.component.scss'],
})
export class DashboardViewerComponent implements OnInit {

  @ViewChild('viewer', { read: DashboardCanvasComponent })
  private dashboardCanvas: DashboardCanvasComponent | null = null;

  public dashboard: Dashboard | undefined;

  constructor(public dashboardService: DashboardService, private route: ActivatedRoute, private cd: ChangeDetectorRef) { }

  async ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.dashboard = await this.dashboardService.getById(id);
      if (this.dashboard && this.dashboard.widgetsTree) {
        this.dashboardService.currentDashboard = this.dashboard;
        setTimeout(() => this.updateComposer());
      }
    }
  }

  updateComposer(): void {
    if (this.dashboard && this.dashboard.widgetsTree) {
      if (this.dashboardCanvas) {
        this.dashboardCanvas.renderDashboard();
      }
    }
  }
}
