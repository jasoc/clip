import { inject, Type } from "@angular/core";
import { BaseWidget } from "gridstack/dist/angular";
import { DashboardService } from "../../../services/dashboard.service";
import { DynamicFormRoot } from "../../../components/dynamic-form/types/dynamic-form";

export function ClipWidget(metadata: WidgetMetadata) {
  return function decorator(target: Type<BaseWidget>) {
    DashboardService.InitiateClipWidget(target, metadata);
  };
}

export type WidgetMetadata = {
    id: string;
    name: string;
    description: string | undefined;
    icon?: string | undefined;
    minH?: number | undefined;
    minW?: number | undefined;
    optionsForm?: DynamicFormRoot;
}