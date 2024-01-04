import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { PermissionsService } from 'src/app/services/permissions.service';
import { DashboardComposerComponent } from './pages/composer/dashboard-composer.component';
import { DashboardMainComponent } from './pages/main/dashboard-main.component';
import { DashboardViewerComponent } from './pages/viewer/dashboard-viewer.component';

const routes: Routes = [
  { path: '', canActivate: [PermissionsService.CanActivateFn], component: DashboardMainComponent },
  { path: 'view/:id', canActivate: [PermissionsService.CanActivateFn], component: DashboardViewerComponent },
  { path: 'composer/:id', canActivate: [PermissionsService.CanActivateFn], component: DashboardComposerComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
