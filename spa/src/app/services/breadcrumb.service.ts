import { filter } from 'rxjs';

import { inject, Injectable, signal } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';

import { Breadcrumb } from '../domain';

@Injectable({ providedIn: 'root' })
export class BreadcrumbService {
  private readonly router = inject(Router);

  readonly breadcrumbs = signal<Breadcrumb[]>([]);

  constructor() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      const root = this.router.routerState.snapshot.root;
      this.breadcrumbs.set(this.buildBreadcrumbs(root));
    });
  }

  private buildBreadcrumbs(
    route: ActivatedRouteSnapshot,
    url: string = '',
    breadcrumbs: Breadcrumb[] = []
  ): Breadcrumb[] {
    if (!route.routeConfig) {
      // root → ignoro e passo ai figli
      return route.firstChild ? this.buildBreadcrumbs(route.firstChild, url, breadcrumbs) : breadcrumbs;
    }

    // Prendi il path dai segmenti effettivi
    const segments = route.url.map((s) => s.toString());
    const routeURL = segments.join('/');

    const nextUrl = routeURL ? `${url}/${routeURL}` : url;

    // --- definizione label ---
    let label: string | undefined;

    // 1. se i dati del resolver ci danno Override (es. dashboard.name)
    if (route.data) {
      if (route.data['dashboard']?.name) {
        label = route.data['dashboard'].name;
      }
      // in generale puoi aggiungere qui altri resolver per entità diverse
    }

    // 2. fallback → se label manca, prendi direttamente il segmento URL
    if (!label && segments.length) {
      label = segments.join('/');
    }

    if (label) {
      breadcrumbs.push({ label, url: nextUrl });
    }

    // scendi sui figli
    return route.firstChild ? this.buildBreadcrumbs(route.firstChild, nextUrl, breadcrumbs) : breadcrumbs;
  }
}
