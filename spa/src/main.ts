import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { InitGridstackWidgets } from './app/modules/dashboards/init-widgets';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

InitGridstackWidgets();