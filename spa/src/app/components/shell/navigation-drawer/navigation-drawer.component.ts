import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { animate, animateChild, group, query, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {MatTreeModule, MatTreeNestedDataSource} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Router } from '@angular/router'; 
import { simpleFade } from 'src/app/animations/enterAndLeave';
import { M3ButtonComponent } from '../../m3-button/m3-button.component';
import { ThemeService } from 'src/app/services/theme.service';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [{name: 'Apple'}, {name: 'Banana'}, {name: 'Fruit loops'}],
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [{name: 'Broccoli'}, {name: 'Brussels sprouts'}],
      },
      {
        name: 'Orange',
        children: [{name: 'Pumpkins'}, {name: 'Carrots'}],
      },
    ],
  },
];

@Component({
  standalone: true,
  selector: 'app-navigation-drawer',
  templateUrl: './navigation-drawer.component.html',
  styleUrls: ['./navigation-drawer.component.scss'],
  providers: [ThemeService],
  imports: [CommonModule, MatButtonModule, M3ButtonComponent, MatTreeModule, MatIconModule],
  
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
  
  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();

  constructor(public router: Router, public themeService: ThemeService) {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;
  
  public collapsed: boolean = false;
  public isLightTheme: boolean = false;

  public ToggleCollapse() {
    this.collapsed = !this.collapsed;
  }

  onThemeSwitchChange() {
    this.themeService.switchDarkLight();
  }

  navigate(path: string) {
    this.router.navigate([path]);
    //this.router.navigate([{ outlets: { 'inner-ro': [path] }}]);
  }
}
