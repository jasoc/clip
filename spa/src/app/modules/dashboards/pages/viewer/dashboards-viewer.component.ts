import { GridStack } from 'gridstack';
import { GridstackComponent, GridstackModule, NgGridStackOptions } from 'gridstack/dist/angular';

import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';

import { M3IconComponent } from '../../../../components/m3-icon/m3-icon.component';
import { M3TabComponent } from '../../../../components/m3-tabs/m3-tab/m3-tab.component';
import { M3TabsComponent } from '../../../../components/m3-tabs/m3-tabs.component';
import { DashboardModel, DashboardService } from '../../../../services/dashboard.service';

@Component({
  selector: 'clip-dashboards-viewer',
  standalone: true,
  templateUrl: './dashboards-viewer.component.html',
  styleUrls: ['./dashboards-viewer.component.scss'],
  imports: [GridstackModule, MatButtonModule, MatIconModule, M3TabsComponent, M3TabComponent, M3IconComponent],
  providers: [DashboardService],
})
export class DashboardsViewerComponent implements AfterViewInit {
  @ViewChild(GridstackComponent)
  gridComp?: GridstackComponent;

  public dashboard: DashboardModel | undefined;

  public gridOptions: NgGridStackOptions = {
    cellHeight: 50,
    margin: 5,
    minRow: 2,
  };
  public allWidgetsSelector: Array<string> = [];

  constructor(
    public dashboardService: DashboardService,
    private route: ActivatedRoute
  ) {
    this.allWidgetsSelector = this.dashboardService.getAllWidgetsSelector();
  }

  async ngAfterViewInit(): Promise<void> {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.dashboard = await this.dashboardService.GetDashboard(id);
    }
    if (this.dashboard && this.gridComp) {
      GridStack.addGrid(this.gridComp!.el, JSON.parse(this.dashboard.json_grid!));
      this.gridComp.grid?.setStatic(true, false, true);
    }
  }
}
