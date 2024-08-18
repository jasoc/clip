import { Component, OnInit, ViewChild } from '@angular/core';
import {
  GridstackComponent,
  gsCreateNgComponents,
  NgGridStackOptions,
  NgGridStackWidget,
  GridstackModule,
} from 'gridstack/dist/angular';
import { MatButtonModule } from '@angular/material/button';
import { DashboardsWidgetCardComponent } from '../../widgets/card/dashboards-widget-card.component';
import { GridStack } from 'gridstack';
import { M3TabsComponent } from '../../../../components/m3-tabs/m3-tabs.component';
import { M3TabComponent } from '../../../../components/m3-tabs/m3-tab/m3-tab.component';
import { MatIconModule } from '@angular/material/icon';
import { M3IconComponent } from '../../../../components/m3-icon/m3-icon.component';
import { animate, animateChild, group, query, state, style, transition, trigger } from '@angular/animations';
import { simpleFade } from '../../../../animations/enterAndLeave';

@Component({
  selector: 'clip-dashboards-composer',
  standalone: true,
  templateUrl: './dashboards-composer.component.html',
  styleUrls: ['./dashboards-composer.component.scss'],
  imports: [GridstackModule, MatButtonModule, MatIconModule, M3TabsComponent, M3TabComponent, M3IconComponent],
  animations: [
    trigger('showSiderContent', simpleFade('200ms')),
    trigger('collapseSider', [
      state(
        'true',
        style({
          width: "20px",
          padding: "0px",
        })
      ),
      state(
        'false',
        style({
          width: "340px",
          padding: "16px",
        })
      ),
      transition('true <=> false', [
        group([query('@*', animateChild()), animate('280ms cubic-bezier(0.18, 0.89, 0.32, 1)')]),
      ]),
    ]),
  ],
})
export class DashboardsComposerComponent implements OnInit {
  @ViewChild(GridstackComponent) gridComp?: GridstackComponent;

  public ids: number = 0;
  public siderCollapsed: boolean = false;

  // public children: NgGridStackWidget[] = [{selector:'clip-dashboards-widget-card'}, {selector:'clip-dashboards-widget-card'}, {selector:'clip-dashboards-widget-card'}, {selector:'clip-dashboards-widget-card'}];

  public gridOptions: NgGridStackOptions = {
    margin: 5,
    // float: true,
    minRow: 1,
    cellHeight: 40,
    // columnOpts: { breakpoints: [{ w: 768, c: 1 }] },
    // children: this.children
  };

  constructor() {
    GridstackComponent.addComponentToSelectorType([DashboardsWidgetCardComponent]);
  }

  ngOnInit(): void {
    GridStack.addRemoveCB = gsCreateNgComponents;
  }

  public add() {
    if (!this.gridComp?.el) return;
    this.gridComp?.grid?.addWidget({
      x: 1,
      y: 1,
      h: 3,
      w: 3,
      selector: 'clip-dashboards-widget-card',
    } as NgGridStackWidget);
    this.gridComp?.grid?.save();
  }

  toggleSiderCollapse() {
    this.siderCollapsed = !this.siderCollapsed;
    console.log(this.siderCollapsed);
  }
}
