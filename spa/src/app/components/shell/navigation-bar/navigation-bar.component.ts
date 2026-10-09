import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';

import { UserService } from '../../../services/user.service';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  standalone: true,
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatChipsModule, SearchBarComponent, BreadcrumbComponent],
})
export class NavigationBarComponent {
  readonly Paths: string[] = ['home', 'about'];
  private readonly userService = inject(UserService);
}
