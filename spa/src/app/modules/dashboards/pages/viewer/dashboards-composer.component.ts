import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
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
import { DashboardModel, DashboardService } from '../../../../services/dashboard.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'clip-dashboards-composer',
  standalone: true,
  templateUrl: './dashboards-composer.component.html',
  styleUrls: ['./dashboards-composer.component.scss'],
  imports: [GridstackModule, MatButtonModule, MatIconModule, M3TabsComponent, M3TabComponent, M3IconComponent],
  providers: [DashboardService],
})
export class DashboardsComposerComponent implements OnInit {

  public dashboard: DashboardModel | undefined;

  public gridOptions: NgGridStackOptions = {
    margin: 5,
    minRow: 1,
    acceptWidgets: true,
    cellHeight: 40,
  };

  public allWidgetsSelector: Array<string> = [];

  constructor(public dashboardService: DashboardService, private route: ActivatedRoute) {
    this.allWidgetsSelector = this.dashboardService.getAllWidgetsSelector();
  }

  async ngOnInit(): Promise<void> {
    GridStack.addRemoveCB = gsCreateNgComponents;

    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.dashboard = await this.dashboardService.GetDashboard(id);
    }
  }
}
