import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';

import { M3IconComponent } from '../components/m3-icon/m3-icon.component';
import { BreadcrumbComponent } from '../components/shell/breadcrumb/breadcrumb.component';
import { NavigationDrawerComponent } from '../components/shell/navigation-drawer/navigation-drawer.component';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'clip-shell',
  standalone: true,
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  imports: [NavigationDrawerComponent, MatIconModule, RouterOutlet, BreadcrumbComponent, M3IconComponent],
})
export class ShellComponent {
  public themeService: ThemeService = inject(ThemeService);
}
