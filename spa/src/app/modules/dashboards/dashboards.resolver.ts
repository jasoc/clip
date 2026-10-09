import { from } from 'rxjs';

import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';

import { DashboardModel } from '../../domain';
import { DashboardService } from '../../services/dashboard.service';

export const dashboardResolver: ResolveFn<DashboardModel> = (route: ActivatedRouteSnapshot) => {
  const dashboardService = inject(DashboardService);
  const id = route.paramMap.get('id')!;
  return from(dashboardService.GetDashboard(id));
};
