import { Type } from '@angular/core';
import { BaseWidget } from 'gridstack/dist/angular';

import { DynamicFormRoot } from '../components/dynamic-form/types/dynamic-form';

export type ClipWidgetInfo = {
  widgetType: Type<BaseWidget>;
  metadata: WidgetMetadata;
};

export interface DashboardModel {
  id?: string;
  name?: string;
  json_grid?: string;
  user_id?: string;
}

export interface DashboardUpdateModel {
  name?: string;
  json_grid?: string;
}

export type WidgetMetadata = {
  id: string;
  name: string;
  description: string | undefined;
  icon?: string | undefined;
  minH?: number | undefined;
  minW?: number | undefined;
  optionsForm?: DynamicFormRoot;
};

export interface LabelOptions {
  content: string;
  size: string;
}
