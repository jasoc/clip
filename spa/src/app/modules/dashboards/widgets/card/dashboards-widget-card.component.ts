import { Component, OnDestroy } from '@angular/core';
import { BaseWidget } from 'gridstack/dist/angular';

@Component({
  selector: 'clip-dashboards-widget-card',
  standalone: true,
  templateUrl: './dashboards-widget-card.component.html',
  styleUrls: ['./dashboards-widget-card.component.scss'],
})
export class DashboardsWidgetCardComponent extends BaseWidget implements OnDestroy {
  ngOnDestroy() {
    console.log('Comp A destroyed');
  }
}
