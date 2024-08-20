import { Component, OnDestroy } from '@angular/core';
import { BaseWidget } from 'gridstack/dist/angular';
import { ClipWidget } from '../base-widget.directive';

const selector = "clip-dashboards-widget-spacer";

@ClipWidget({
  id: selector,
  name: "spacer",
  description: "Card",
  minH: 2,
  minW: 4,
})
@Component({
  selector: selector,
  standalone: true,
  templateUrl: './dashboards-widget-spacer.component.html',
  styleUrls: ['./dashboards-widget-spacer.component.scss'],
})
export class DashboardsWidgetSpacerComponent extends BaseWidget {

}
