import { Injectable } from "@angular/core";

enum Theme {
    Light = 'clip-light',
    Dark = 'clip-dark'
}

@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    public defaultTheme: Theme = Theme.Dark;
    public currentTheme: Theme = this.defaultTheme;

    constructor() {
        let localValue = localStorage.getItem('theme');
        console.log(localValue);
        if (localValue != null) {
            this.currentTheme = Theme[Object.keys(Theme)[Object.values(Theme).indexOf(localValue as unknown as Theme)] as keyof typeof Theme];
        }
        this.setDataTheme();
    }

    public switchDarkLight() {
        if (this.currentTheme == Theme.Light) {
            this.currentTheme = Theme.Dark;
        }
        else {
            this.currentTheme = Theme.Light;
        }
        this.saveTheme();
        this.setDataTheme();
    }

    private saveTheme() {
        localStorage.setItem('theme', this.currentTheme.toString());
    }

    private setDataTheme() {
        document.body.setAttribute('data-theme', this.currentTheme.toString());
    }
}
