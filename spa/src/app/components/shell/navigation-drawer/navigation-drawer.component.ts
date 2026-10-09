import { CdkObserveContent } from '@angular/cdk/observers';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';

import { ThemeService } from '../../../services/theme.service';
import { UserService } from '../../../services/user.service';
import { M3ButtonComponent } from '../m3-button/m3-button.component';
import { NavigationElement, navigationElementsTree } from '../navigation-tree';

@Component({
  standalone: true,
  selector: 'app-navigation-drawer',
  templateUrl: './navigation-drawer.component.html',
  styleUrls: ['./navigation-drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatChipsModule,
    ReactiveFormsModule,
    M3ButtonComponent,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    CdkObserveContent,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline',
      },
    },
    ThemeService,
  ],
})
export class NavigationDrawerComponent {
  readonly router = inject(Router);
  readonly userService = inject(UserService);
  readonly themeService = inject(ThemeService);

  readonly collapsed = signal(false);
  readonly userWidgetCollapsed = signal(true);
  readonly navigationElementsTree = signal<NavigationElement[]>(
    navigationElementsTree.map((el) => el.clone())
  );

  readonly themeForm = new FormGroup({
    theme: new FormControl(this.themeService.currentThemeStr()),
  });

  ToggleCollapse() {
    const isCollapsed = this.collapsed();
    this.navigationElementsTree.update((tree) =>
      tree.map((element) => {
        const updated = element.clone();
        updated.isExpanded = false;
        if (isCollapsed) updated.rippled = false;
        return updated;
      })
    );
    if (!isCollapsed) {
      this.userWidgetCollapsed.set(true);
    }
    this.collapsed.set(!isCollapsed);
    localStorage.setItem('navigation-drawer-collapsed', !isCollapsed ? '1' : '0');
  }

  forceUserWidgetExpand() {
    if (this.collapsed()) {
      this.collapsed.set(false);
    } else {
      return;
    }
    if (this.userWidgetCollapsed()) {
      this.userWidgetCollapsed.set(false);
    }
  }

  navigate(navigationElement: NavigationElement, parentElement: NavigationElement | null = null) {
    const isCollapsed = this.collapsed();

    if (isCollapsed && parentElement == null) {
      const overview = navigationElement.subElements.find((subel) => subel.name === 'Overview');
      if (overview) this.router.navigateByUrl(overview.redirect);
    }
    if (navigationElement.subElements.length === 0) {
      this.router.navigateByUrl(navigationElement.redirect);
    }

    this.navigationElementsTree.update((tree) =>
      tree.map((element) => {
        const updated = element.clone();
        if (element !== parentElement) {
          updated.rippled = false;
        } else {
          updated.rippled = true;
        }
        updated.subElements = element.subElements.map((sub) => {
          const subUpdated = sub.clone();
          subUpdated.rippled = false;
          return subUpdated;
        });

        // Handle expand/collapse for the clicked element
        if (element === parentElement || (parentElement == null && element.name === navigationElement.name)) {
          if (!isCollapsed) {
            if (navigationElement.subElements.length > 0) {
              if (navigationElement.isExpanded) {
                updated.rippled = false;
                updated.isExpanded = false;
              } else {
                updated.rippled = true;
                updated.isExpanded = true;
              }
            } else {
              updated.rippled = true;
            }
          } else {
            updated.rippled = true;
          }
        }

        return updated;
      })
    );
  }
}
