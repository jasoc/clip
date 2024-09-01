import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

export enum Theme {
  Light = 'clip-light',
  Dark = 'clip-dark',
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public defaultTheme: Theme = Theme.Dark;
  public currentTheme: Theme = this.defaultTheme;

  constructor(
    @Inject(PLATFORM_ID)
    private platformId: object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const localValue = localStorage.getItem('theme');
      if (localValue != null) {
        this.currentTheme =
          Theme[Object.keys(Theme)[Object.values(Theme).indexOf(localValue as unknown as Theme)] as keyof typeof Theme];
      }
      this.setDataTheme();
    }
  }

  public switchDarkLight() {
    if (this.currentTheme == Theme.Light) {
      this.currentTheme = Theme.Dark;
    } else {
      this.currentTheme = Theme.Light;
    }
    this.saveTheme();
    this.setDataTheme();
    // window.location.reload();
  }

  private saveTheme() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', this.currentTheme.toString());
    }
  }

  private setDataTheme() {
    if (isPlatformBrowser(this.platformId)) {
      document.body.setAttribute('data-theme', this.currentTheme.toString());
    }
  }
}
