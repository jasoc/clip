import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { GridstackComponent } from 'gridstack/dist/angular';
import { DashboardsWidgetCardComponent } from './app/modules/dashboards/widgets/card/dashboards-widget-card.component';
import { DashboardsWidgetSpacerComponent } from './app/modules/dashboards/widgets/spacer/dashboards-widget-spacer.component';
import { DashboardsWidgetLabelComponent } from './app/modules/dashboards/widgets/label/dashboards-widget-label.component';

GridstackComponent.addComponentToSelectorType([
  DashboardsWidgetCardComponent,
  DashboardsWidgetSpacerComponent,
  DashboardsWidgetLabelComponent,
]);

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
