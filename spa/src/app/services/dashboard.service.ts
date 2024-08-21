import { reflectComponentType, Type } from '@angular/core';
import { BaseWidget, GridstackComponent } from 'gridstack/dist/angular';
import { WidgetMetadata } from '../modules/dashboards/widgets/base-widget.directive';
import { BackendService } from './backend.service';

export type ClipWidgetInfo = {
  widgetType: Type<BaseWidget>;
  metadata: WidgetMetadata;
};

interface DashboardModel {
  id: string;
  name: string;
  json_grid: string;
  user_id: string;
}

interface DashboardUpdateModel {
  name: string | undefined;
  json_grid: string | undefined;
}

export class DashboardService extends BackendService {
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

  async GetDashboards(skip: number = 0, limit: number = 100): Promise<DashboardModel[]> {
    let res = await this.get<DashboardModel[]>('/dashboards/', { skip, limit });
    return res.body!.data;
  }

  async GetDashboard(dashboardId: string): Promise<DashboardModel> {
    let res = await this.get<DashboardModel>('/dashboards/' + dashboardId);
    return res.body!.data;
  }

  async UpdateDashboard(dashboardId: string, userInfo: DashboardUpdateModel): Promise<DashboardModel> {
    let res = await this.put<DashboardModel>('/dashboards/' + dashboardId, userInfo);
    return res.body!.data;
  }

  async DeleteDashboard(dashboardId: string): Promise<void> {
    await this.delete('/dashboards/' + dashboardId);
  }
}
