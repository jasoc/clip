import { from, Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { DashboardModel, DashboardService } from '../../services/dashboard.service';

@Injectable({ providedIn: 'root' })
export class DashboardResolver implements Resolve<DashboardModel> {
  constructor(private dashboardService: DashboardService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<DashboardModel> {
    const id = route.paramMap.get('id')!;
    return from(this.dashboardService.GetDashboard(id));
  }
}
