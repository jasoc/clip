import { GridstackComponent } from 'gridstack/dist/angular';

import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import {
    DashboardsWidgetCardComponent
} from './app/modules/dashboards/widgets/card/dashboards-widget-card.component';
import {
    DashboardsWidgetLabelComponent
} from './app/modules/dashboards/widgets/label/dashboards-widget-label.component';
import {
    DashboardsWidgetSpacerComponent
} from './app/modules/dashboards/widgets/spacer/dashboards-widget-spacer.component';

GridstackComponent.addComponentToSelectorType([
  DashboardsWidgetCardComponent,
  DashboardsWidgetSpacerComponent,
  DashboardsWidgetLabelComponent,
]);

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
