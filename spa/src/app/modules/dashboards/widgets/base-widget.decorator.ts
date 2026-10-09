import { Type } from '@angular/core';
import { BaseWidget } from 'gridstack/dist/angular';
import { DashboardService } from '../../../services/dashboard.service';
import { WidgetMetadata } from '../../../domain';

export function ClipWidget(metadata: WidgetMetadata) {
  return function decorator(target: Type<BaseWidget>) {
    DashboardService.InitiateClipWidget(target, metadata);
  };
}
