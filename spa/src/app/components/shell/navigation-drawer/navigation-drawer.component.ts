import { ChangeDetectionStrategy, Component } from '@angular/core';
import { animate, animateChild, group, query, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { M3ButtonComponent } from '../../m3-button/m3-button.component';
import { simpleFade } from '../../../animations/enterAndLeave';
import { ThemeService } from '../../../services/theme.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-navigation-drawer',
  templateUrl: './navigation-drawer.component.html',
  styleUrls: ['./navigation-drawer.component.scss'],
  providers: [ThemeService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, M3ButtonComponent, MatIconModule, MatButtonModule],
  animations: [
    trigger('showUserButton', simpleFade('150ms')),
    trigger('openClose', [
      state('open', style({
        width: '275px',
      })),
      state('closed', style({
        width: '70px',
      })),
      transition('open <=> closed', [
        group([
          query('@*', animateChild()),
          animate('280ms cubic-bezier(0.18, 0.89, 0.32, 1)'),
        ]),
      ]),
    ]),
  ],
})
export class NavigationDrawerComponent {

  public collapsed: boolean = false;
  public isLightTheme: boolean = false;

  navigationElementsTree: NavigationElement[] = [
    new NavigationElement({
      name: 'Home',
      icon: 'token',
      redirect: 'home',
      subElements: [
        new NavigationElement({
          name: 'Overview',
          icon: 'navigate_next',
          redirect: 'home',
        }),
        new NavigationElement({
          name: 'About',
          icon: 'info',
          redirect: 'home/about',
        })
      ]
    }),
    new NavigationElement({
      type: 'tag',
      name: 'Clip',
      icon: 'token'
    }),
    new NavigationElement({
      name: 'Dashboards',
      icon: 'dataset',
      subElements: [
        new NavigationElement({
          name: 'Overview',
          icon: 'navigate_next',
          redirect: 'dashboards',
        }),
        new NavigationElement({
          name: 'All dashboards',
          icon: 'wysiwyg',
          redirect: 'dashboards/all'
        }),
        new NavigationElement({
          name: 'New dashboard',
          icon: 'add_circle',
          redirect: 'dashboards/composer'
        })
      ]
    }),
    new NavigationElement({
      type: 'tag',
      name: 'Automation',
    }),
    new NavigationElement({
      name: 'Virtual Assistant',
      icon: 'psychology',
      redirect: 'vms'
    }),
    new NavigationElement({
      type: 'tag',
      name: 'System',
    }),
    new NavigationElement({
      name: 'Virtual Machines',
      icon: 'computer',
      redirect: 'vms'
    }),
    new NavigationElement({
      name: 'Kubernetes',
      icon: 'directions_boat',
      subElements: [
        new NavigationElement({
          name: 'Overview',
          icon: 'navigate_next',
          redirect: 'home',
        }),
        new NavigationElement({
          type: 'tag',
          name: 'Workloads',
        }),
        new NavigationElement({
          name: 'Pods',
          icon: 'wysiwyg',
          redirect: 'dashboards/composer'
        }),
        new NavigationElement({
          name: 'Deployment',
          icon: 'add_circle',
          redirect: 'dashboards/composer'
        }),
        new NavigationElement({
          name: 'Services',
          icon: 'layers',
          redirect: 'dashboards/composer'
        }),
        new NavigationElement({
          name: 'ReplicaSet',
          icon: 'view_module',
          redirect: 'dashboards/composer'
        }),
        new NavigationElement({
          name: 'StatefulSet',
          icon: 'storage',
          redirect: 'dashboards/composer'
        }),
        new NavigationElement({
          name: 'DaemonSet',
          icon: 'settings_input_component',
          redirect: 'dashboards/composer'
        }),
        new NavigationElement({
          name: 'Job',
          icon: 'work',
          redirect: 'dashboards/composer'
        }),
        new NavigationElement({
          name: 'Secret',
          icon: 'vpn_key',
          redirect: 'dashboards/composer'
        }),
        new NavigationElement({
          name: 'ConfigMap',
          icon: 'map',
          redirect: 'dashboards/composer'
        }),
        new NavigationElement({
          type: 'tag',
          name: 'Network',
        }),
        new NavigationElement({
          name: 'Ingress',
          icon: 'call_split',
          redirect: 'dashboards/composer'
        }),
        new NavigationElement({
          type: 'tag',
          name: 'Storage',
        }),
        new NavigationElement({
          name: 'Volume',
          icon: 'folder',
          redirect: 'dashboards/composer'
        })
      ]
    }),
  ];

  constructor(public router: Router, public themeService: ThemeService) { }

  public ToggleCollapse() {
    this.navigationElementsTree.forEach((element) => {
      element.isExpanded = false;
      if (this.collapsed)
        element.rippled = false;
    });
    this.collapsed = !this.collapsed;
    localStorage.setItem('navigation-drawer-collapsed', this.collapsed ? '1' : '0');
  }

  onThemeSwitchChange() {
    this.themeService.switchDarkLight();
  }

  navigate(navigationElement: NavigationElement, parentElement: NavigationElement | null = null) {
    if (this.collapsed && parentElement == null) {
      this.router.navigateByUrl(navigationElement.subElements.filter(subel => subel.name == 'Overview')[0].redirect);
    }
    if (navigationElement.subElements.length == 0) {
      this.router.navigateByUrl(navigationElement.redirect);
    }
    this.navigationElementsTree.forEach((element) => {
      if (element != parentElement) {
        element.rippled = false;
      }
      else {
        element.rippled = true;
      }
      element.subElements.forEach((subElement) => {
        subElement.rippled = false;
      });
    })
    if (!this.collapsed) {
      if (navigationElement.subElements.length > 0) {
        if (navigationElement.isExpanded) {
          navigationElement.rippled = false;
          navigationElement.isExpanded = false;
        }
        else {
          navigationElement.rippled = true;
          navigationElement.isExpanded = true;
        }
      }
      else {
        navigationElement.rippled = true;
      }
    }
    else {
      navigationElement.rippled = true;
    }
  }
}

class NavigationElement {
  public subElements: NavigationElement[] = [];

  public name: string = '';

  public icon: string = '';

  public redirect: string = '';

  public rippled: boolean = false;

  public isExpanded: boolean = false;

  public type: 'button' | 'tag' = 'button';

  public constructor(init?: Partial<NavigationElement>) {
    Object.assign(this, init);
  }
}
