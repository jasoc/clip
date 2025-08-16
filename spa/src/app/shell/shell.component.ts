import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { BreadcrumbComponent } from '../components/shell/breadcrumb/breadcrumb.component';
import {
    NavigationBarComponent
} from '../components/shell/navigation-bar/navigation-bar.component';
import {
    NavigationDrawerComponent
} from '../components/shell/navigation-drawer/navigation-drawer.component';

@Component({
  selector: 'clip-shell',
  standalone: true,
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  imports: [NavigationDrawerComponent, NavigationBarComponent, RouterOutlet, BreadcrumbComponent],
})
export class ShellComponent {}
