import { Routes } from '@angular/router';

import { DashboardResolver } from './modules/dashboards/dashboards.resolver';
import { PermissionsService } from './services/permissions.service';

export const routes: Routes = [
  {
    path: '',
    canActivate: [PermissionsService.isUserLoggedFn],
    loadComponent: () => import('./shell/shell.component').then((m) => m.ShellComponent),
    children: [
      // HOME
      {
        path: 'home',
        canActivate: [PermissionsService.isUserLoggedFn],
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadComponent: () => import('./modules/home/home.component').then((m) => m.HomeMainComponent),
          },
          {
            path: 'about',
            loadComponent: () =>
              import('./modules/home/pages/about/home-about.component').then((m) => m.HomeAboutComponent),
          },
        ],
      },

      // SETTINGS
      {
        path: 'settings',
        canActivate: [PermissionsService.isUserLoggedFn],
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadComponent: () => import('./modules/settings/settings.component').then((m) => m.SettingsComponent),
          },
          {
            path: 'personal',
            loadComponent: () =>
              import('./modules/settings/pages/personal/settings-personal.component').then(
                (m) => m.SettingsPersonalComponent
              ),
          },
        ],
      },

      // DASHBOARDS
      {
        path: 'dashboards',
        canActivate: [PermissionsService.isUserLoggedFn],
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadComponent: () => import('./modules/dashboards/dashboards.component').then((m) => m.DashboardsComponent),
          },
          {
            path: ':id',
            canActivate: [PermissionsService.isUserLoggedFn],
            resolve: { dashboard: DashboardResolver },
            loadComponent: () =>
              import('./modules/dashboards/pages/viewer/dashboards-viewer.component').then(
                (m) => m.DashboardsViewerComponent
              ),
          },
          {
            path: 'composer',
            canActivate: [PermissionsService.isUserLoggedFn],
            children: [
              {
                path: ':id',
                canActivate: [PermissionsService.isUserLoggedFn],
                resolve: { dashboard: DashboardResolver },
                loadComponent: () =>
                  import('./modules/dashboards/pages/composer/dashboards-composer.component').then(
                    (m) => m.DashboardsComposerComponent
                  ),
              },
            ],
          },
        ],
      },
    ],
  },

  // LOGIN / REGISTER
  {
    path: 'login',
    loadComponent: () => import('./modules/login/pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('./modules/login/pages/register/register.component').then((m) => m.RegisterComponent),
  },
];
