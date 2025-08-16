import { BehaviorSubject, filter } from 'rxjs';

import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';

export interface Breadcrumb {
  label: string;
  url: string;
}

@Injectable({ providedIn: 'root' })
export class BreadcrumbService {
  private breadcrumbs$ = new BehaviorSubject<Breadcrumb[]>([]);

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      const root = this.router.routerState.snapshot.root;
      const breadcrumbs: Breadcrumb[] = this.buildBreadcrumbs(root);
      console.log(breadcrumbs);
      this.breadcrumbs$.next(breadcrumbs);
    });
  }

  get breadcrumbs() {
    return this.breadcrumbs$.asObservable();
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
