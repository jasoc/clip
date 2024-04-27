import { Component } from '@angular/core';
import { NavigationDrawerComponent } from "../components/shell/navigation-drawer/navigation-drawer.component";
import { NavigationBarComponent } from "../components/shell/navigation-bar/navigation-bar.component";
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'clip-shell',
    standalone: true,
    templateUrl: './shell.component.html',
    styleUrls: ['./shell.component.scss'],
    imports: [NavigationDrawerComponent, NavigationBarComponent, RouterOutlet]
})
export class ShellComponent {

}
