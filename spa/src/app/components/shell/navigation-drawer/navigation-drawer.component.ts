import { animate, animateChild, group, query, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

import { simpleFade } from '../../../animations/enterAndLeave';
import { ThemeService } from '../../../services/theme.service';
import { M3ButtonComponent } from '../m3-button/m3-button.component';
import { NavigationElement, navigationElementsTree } from '../navigation-tree';

@Component({
  standalone: true,
  selector: 'app-navigation-drawer',
  templateUrl: './navigation-drawer.component.html',
  styleUrls: ['./navigation-drawer.component.scss'],
  providers: [ThemeService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatChipsModule, M3ButtonComponent, MatIconModule, MatButtonModule],
  animations: [
    trigger('showUserButton', simpleFade('150ms')),
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
  public isLightTheme: boolean = false;
  public navigationElementsTree: NavigationElement[];

  constructor(
    public router: Router,
    public themeService: ThemeService
  ) {
    this.navigationElementsTree = navigationElementsTree;
  }

  public ToggleCollapse() {
    this.navigationElementsTree.forEach((element) => {
      element.isExpanded = false;
      if (this.collapsed) element.rippled = false;
    });
    this.collapsed = !this.collapsed;
    localStorage.setItem('navigation-drawer-collapsed', this.collapsed ? '1' : '0');
  }

  onThemeSwitchChange() {
    this.themeService.switchDarkLight();
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
