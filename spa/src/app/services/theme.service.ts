import { isPlatformBrowser } from '@angular/common';
import { effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

// List of available themes
// - clip-dark -> spa/src/styles/theme/_clip-dark.scss
// - clip-light -> spa/src/styles/theme/_clip-light.scss

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);

  readonly currentThemeStr = signal('clip-dark');
  readonly currentWatermark = signal('');
  readonly watermarks: { [key: string]: string } = {};

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const localValue = localStorage.getItem('theme');
      if (localValue != null) {
        this.currentThemeStr.set(localValue);
      }
    }

    // Sync data-theme attribute with signal
    effect(() => {
      const theme = this.currentThemeStr();
      if (isPlatformBrowser(this.platformId)) {
        document.body.setAttribute('data-theme', theme);
      }
    });

    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        if (this.watermarks[ev.urlAfterRedirects]) {
          this.currentWatermark.set(this.watermarks[ev.url]);
        } else {
          this.currentWatermark.set('');
        }
      }
    });
  }

  public setThemeByString(theme: string) {
    this.currentThemeStr.set(theme);
    this.saveTheme();
  }

  private saveTheme() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', this.currentThemeStr());
    }
  }
}
