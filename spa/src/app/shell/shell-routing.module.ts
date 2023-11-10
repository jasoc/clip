import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { PermissionsService } from '../services/permissions.service';
import { ShellComponent } from './shell.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [PermissionsService.CanActivateFn],
        component: ShellComponent,
        children: [
            { path: 'home', canActivate: [PermissionsService.CanActivateFn], loadChildren: () => import('../modules/home/home.module').then((m) => m.HomeModule) },
        ]
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShellRoutingModule { }
