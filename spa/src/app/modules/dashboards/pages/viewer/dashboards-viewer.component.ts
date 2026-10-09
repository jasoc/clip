import { GridStack } from 'gridstack';
import { GridstackComponent, GridstackModule, NgGridStackOptions } from 'gridstack/dist/angular';

import { afterNextRender, ChangeDetectionStrategy, Component, inject, signal, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';

import { DashboardModel } from '../../../../domain';
import { DashboardService } from '../../../../services/dashboard.service';

@Component({
  selector: 'clip-dashboards-viewer',
  standalone: true,
  templateUrl: './dashboards-viewer.component.html',
  styleUrls: ['./dashboards-viewer.component.scss'],
  imports: [GridstackModule, MatButtonModule, MatIconModule],
  providers: [DashboardService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardsViewerComponent {
  private readonly gridComp = viewChild(GridstackComponent);
  private readonly dashboardService = inject(DashboardService);
  private readonly route = inject(ActivatedRoute);

  readonly dashboard = signal<DashboardModel | undefined>(undefined);
  readonly allWidgetsSelector: Array<string>;

  readonly gridOptions: NgGridStackOptions = {
    cellHeight: 50,
    margin: 5,
    minRow: 2,
  };

  constructor() {
    this.allWidgetsSelector = this.dashboardService.getAllWidgetsSelector();

    afterNextRender(async () => {
      const id = this.route.snapshot.params['id'];
      if (id) {
        this.dashboard.set(await this.dashboardService.GetDashboard(id));
      }
      const db = this.dashboard();
      const gc = this.gridComp();
      if (db && gc) {
        GridStack.addGrid(gc.el, JSON.parse(db.json_grid!));
        gc.grid?.setStatic(true, false, true);
      }
    });
  }
}
