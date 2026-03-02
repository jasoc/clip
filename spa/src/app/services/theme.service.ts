import { isPlatformBrowser } from '@angular/common';
import { inject, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

// List of available themes
// - clip-dark -> spa/src/styles/theme/_clip-dark.scss
// - clip-light -> spa/src/styles/theme/_clip-light.scss

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public currentThemeStr: string = 'clip-dark';

  public currentWatermark: string = '';
  public watermarks: { [key: string]: string } = {};
  private router = inject(Router);

  constructor(
    @Inject(PLATFORM_ID)
    private platformId: object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const localValue = localStorage.getItem('theme');
      if (localValue != null) {
        this.currentThemeStr = localValue;
      }
      this.setDataTheme();
    }

    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        if (this.watermarks[ev.urlAfterRedirects]) {
          this.currentWatermark = this.watermarks[ev.url];
        } else {
          this.currentWatermark = '';
        }
      }
    });
  }

  public setThemeByString(theme: string) {
    this.currentThemeStr = theme;
    this.saveTheme();
    this.setDataTheme();
  }

  private saveTheme() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', this.currentThemeStr);
    }
  }

  private setDataTheme() {
    if (isPlatformBrowser(this.platformId)) {
      document.body.setAttribute('data-theme', this.currentThemeStr);
    }
  }
}
