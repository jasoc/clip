import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { HomeMainComponent } from './pages/main/home-main.component';
import { HomeAboutComponent } from './pages/about/home-about.component';
import { PermissionsService } from 'src/app/services/permissions.service';

const routes: Routes = [
  { path: '', canActivate: [PermissionsService.CanActivateFn], component: HomeMainComponent },
  { path: 'about', canActivate: [PermissionsService.CanActivateFn], component: HomeAboutComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
