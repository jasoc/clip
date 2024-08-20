import { Component, OnDestroy } from '@angular/core';
import { BaseWidget, NgCompInputs } from 'gridstack/dist/angular';
import { ClipWidget } from '../base-widget.directive';

const selector = "clip-dashboards-widget-card";

@ClipWidget({
  id: selector,
  name: "Card",
  description: "Card",
  minH: 2,
  minW: 4,
})
@Component({
  selector: selector,
  standalone: true,
  templateUrl: './dashboards-widget-card.component.html',
  styleUrls: ['./dashboards-widget-card.component.scss'],
})
export class DashboardsWidgetCardComponent extends BaseWidget {

  public metadata: object = {};

}
