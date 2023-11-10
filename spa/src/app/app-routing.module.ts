import { NgModule } from '@angular/core';
import { PermissionsService } from './services/permissions.service';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', canActivate: [PermissionsService.CanActivateFn], loadChildren: () => import('./shell/shell.module').then((m) => m.ShellModule) },
  { path: 'login', loadChildren: () => import('./modules/login/login.module').then((m) => m.LoginModule) },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
