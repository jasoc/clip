import { Component, OnInit, ViewChild } from '@angular/core';
import { GridstackComponent, gsCreateNgComponents, NgGridStackOptions, NgGridStackWidget, GridstackModule } from 'gridstack/dist/angular';
import { MatButtonModule } from '@angular/material/button';
import { DashboardsWidgetCardComponent } from '../../widgets/card/dashboards-widget-card.component';
import { GridStack } from 'gridstack';

@Component({
  selector: 'clip-dashboards-composer',
  standalone: true,
  templateUrl: './dashboards-composer.component.html',
  styleUrls: ['./dashboards-composer.component.scss'],
  imports: [GridstackModule, MatButtonModule],
})
export class DashboardsComposerComponent implements OnInit {
  @ViewChild(GridstackComponent) gridComp?: GridstackComponent;

  public ids: number = 0;

  // public children: NgGridStackWidget[] = [{selector:'clip-dashboards-widget-card'}, {selector:'clip-dashboards-widget-card'}, {selector:'clip-dashboards-widget-card'}, {selector:'clip-dashboards-widget-card'}];

  public gridOptions: NgGridStackOptions = {
    margin: 5,
    // float: true,
    minRow: 1,
    column: 11,
    cellHeight: 40,
    // columnOpts: { breakpoints: [{ w: 768, c: 1 }] },
    // children: this.children
  };

  constructor(
  ) {
    GridstackComponent.addComponentToSelectorType([DashboardsWidgetCardComponent]);
  }

  ngOnInit(): void {
    GridStack.addRemoveCB = gsCreateNgComponents;
  }

  public add() {
    if (!this.gridComp?.el) return;
    this.gridComp?.grid?.addWidget({x: 1, y: 1, h: 3, w: 3, selector:'clip-dashboards-widget-card'} as NgGridStackWidget);
  }
}
