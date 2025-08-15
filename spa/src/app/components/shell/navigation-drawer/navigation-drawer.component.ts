import {
    animate, animateChild, group, query, state, style, transition, trigger
} from '@angular/animations';
import { CdkObserveContent } from '@angular/cdk/observers';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';

import { simpleFade, simpleFadeVertical } from '../../../animations/enterAndLeave';
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
    CommonModule,
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
  animations: [
    trigger('showUserButton', simpleFade('150ms')),
    trigger('expandUserWidget', simpleFadeVertical('300ms')),
    trigger('openClose', [
      state(
        'open',
        style({
          width: '275px',
        })
      ),
      state(
        'closed',
        style({
          width: '70px',
        })
      ),
      transition('open <=> closed', [
        group([query('@*', animateChild()), animate('280ms cubic-bezier(0.18, 0.89, 0.32, 1)')]),
      ]),
    ]),
    trigger('separatorDisappear', [
      state(
        'true',
        style({
          opacity: '0',
          margin: '0',
        })
      ),
      state(
        'false',
        style({
          opacity: '1',
          margin: '10px 0',
        })
      ),
      transition('true <=> false', [animate('280ms cubic-bezier(0.18, 0.89, 0.32, 1)')]),
    ]),
  ],
})
export class NavigationDrawerComponent {
  public collapsed: boolean = false;
  public userWidgetCollapsed: boolean = false;
  public isLightTheme: boolean = false;
  public navigationElementsTree: NavigationElement[];
  public currentUserAvatarUrl: string | null = null;
  private currentUserId: string | null = null;
  themeForm: FormGroup = new FormGroup({
    theme: new FormControl(this.themeService.currentThemeStr),
  });
  constructor(
    public router: Router,
    public userService: UserService,
    public themeService: ThemeService,
    private cdr: ChangeDetectorRef
  ) {
    this.navigationElementsTree = navigationElementsTree;
  }

  public ToggleCollapse() {
    this.navigationElementsTree.forEach((element) => {
      element.isExpanded = false;
      if (this.collapsed) element.rippled = false;
    });
    if (!this.collapsed) {
      this.userWidgetCollapsed = true;
    }
    this.collapsed = !this.collapsed;
    localStorage.setItem('navigation-drawer-collapsed', this.collapsed ? '1' : '0');
  }

  forceUserWidgetExpand() {
    if (this.collapsed) {
      this.collapsed = false;
    } else {
      return;
    }
    if (this.userWidgetCollapsed) {
      this.userWidgetCollapsed = false;
    }
  }

  navigate(navigationElement: NavigationElement, parentElement: NavigationElement | null = null) {
    if (this.collapsed && parentElement == null) {
      this.router.navigateByUrl(navigationElement.subElements.filter((subel) => subel.name == 'Overview')[0].redirect);
    }
    if (navigationElement.subElements.length == 0) {
      this.router.navigateByUrl(navigationElement.redirect);
    }
    this.navigationElementsTree.forEach((element) => {
      if (element != parentElement) {
        element.rippled = false;
      } else {
        element.rippled = true;
      }
      element.subElements.forEach((subElement) => {
        subElement.rippled = false;
      });
    });
    if (!this.collapsed) {
      if (navigationElement.subElements.length > 0) {
        if (navigationElement.isExpanded) {
          navigationElement.rippled = false;
          navigationElement.isExpanded = false;
        } else {
          navigationElement.rippled = true;
          navigationElement.isExpanded = true;
        }
      } else {
        navigationElement.rippled = true;
      }
    } else {
      navigationElement.rippled = true;
    }
  }
}
