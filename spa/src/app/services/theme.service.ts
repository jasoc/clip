import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

// List of available themes
// - clip-dark -> spa/src/styles/theme/_clip-dark.scss
// - clip-light -> spa/src/styles/theme/_clip-light.scss

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public currentThemeStr: string = 'clip-dark';

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
