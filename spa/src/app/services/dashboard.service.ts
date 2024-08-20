import { reflectComponentType, Type } from "@angular/core";
import { BaseWidget, GridstackComponent } from "gridstack/dist/angular";
import { WidgetMetadata } from "../modules/dashboards/widgets/base-widget.directive";

export type ClipWidgetInfo = {
  widgetType: Type<BaseWidget>;
  metadata: WidgetMetadata;
}

export class DashboardService {

  private static clipWidgetsMapBySelector: { [id: string]: ClipWidgetInfo } = {};

  getAllWidgetsSelector(): Array<string> {
    return Object.keys(GridstackComponent.selectorToType)
      .map((x) => reflectComponentType(GridstackComponent.selectorToType[x])?.selector)
      .filter((x) => x != undefined) as Array<string>;
  }

  static InitiateClipWidget(widgetType: Type<BaseWidget>, metadata: WidgetMetadata) {
    DashboardService.clipWidgetsMapBySelector[metadata.id] = { widgetType, metadata };
  }
  
  getClipWidgetBySelector(selector: string): ClipWidgetInfo {
    return DashboardService.clipWidgetsMapBySelector[selector];
  }
}
