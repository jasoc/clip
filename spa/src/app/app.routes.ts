import { Routes } from '@angular/router';
import { PermissionsService } from './services/permissions.service';

export const routes: Routes = [
  {
    path: '',
    canActivate: [PermissionsService.CanActivateFn],
    loadComponent: () => import('./shell/shell.component').then((m) => m.ShellComponent),
    children: [
      {
        path: 'home',
        canActivate: [PermissionsService.CanActivateFn],
        loadComponent: () => import('./modules/home/home.component').then((m) => m.HomeMainComponent),
      },
      {
        path: 'home/about',
        canActivate: [PermissionsService.CanActivateFn],
        loadComponent: () => import('./modules/home/pages/about/home-about.component').then((m) => m.HomeAboutComponent)
      }
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('./modules/login/pages/login/login.component').then((m) => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./modules/login/pages/register/register.component').then((m) => m.RegisterComponent)
  },
];
