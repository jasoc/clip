import { Routes } from '@angular/router';

import { PermissionsService } from './services/permissions.service';

export const routes: Routes = [
  {
    path: '',
    canActivate: [PermissionsService.isUserLoggedFn],
    loadComponent: () => import('./shell/shell.component').then((m) => m.ShellComponent),
    children: [
      {
        path: 'home',
        canActivate: [PermissionsService.isUserLoggedFn],
        loadComponent: () => import('./modules/home/home.component').then((m) => m.HomeMainComponent),
      },
      {
        path: 'home/about',
        canActivate: [PermissionsService.isUserLoggedFn],
        loadComponent: () =>
          import('./modules/home/pages/about/home-about.component').then((m) => m.HomeAboutComponent),
      },
      {
        path: 'dashboards',
        canActivate: [PermissionsService.isUserLoggedFn],
        loadComponent: () => import('./modules/dashboards/dashboards.component').then((m) => m.DashboardsComponent),
      },
      {
        path: 'dashboards/:id',
        canActivate: [PermissionsService.isUserLoggedFn],
        loadComponent: () =>
          import('./modules/dashboards/pages/viewer/dashboards-viewer.component').then(
            (m) => m.DashboardsViewerComponent
          ),
      },
      {
        path: 'dashboards/composer/:id',
        canActivate: [PermissionsService.isUserLoggedFn],
        loadComponent: () =>
          import('./modules/dashboards/pages/composer/dashboards-composer.component').then(
            (m) => m.DashboardsComposerComponent
          ),
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () => import('./modules/login/pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('./modules/login/pages/register/register.component').then((m) => m.RegisterComponent),
  },
];
