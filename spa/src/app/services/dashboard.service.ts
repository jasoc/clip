import { Injectable, reflectComponentType, Type } from '@angular/core';
import { BaseWidget, GridstackComponent } from 'gridstack/dist/angular';
import { WidgetMetadata } from '../modules/dashboards/widgets/base-widget.decorator';
import { BackendService } from './backend.service';
import { BaseClipWidget } from '../modules/dashboards/widgets/BaseClipWidget';

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

@Injectable({
  providedIn: 'root',
})
export class DashboardService extends BackendService {
  public onWidgetClickInComposerCallback?: (component: BaseClipWidget<any>) => void;

  private static clipWidgetsMapBySelector: {
    [id: string]: ClipWidgetInfo;
  } = {};

  getAllWidgetsSelector(): Array<string> {
    return Object.keys(GridstackComponent.selectorToType)
      .map((x) => reflectComponentType(GridstackComponent.selectorToType[x])?.selector)
      .filter((x) => x != undefined) as Array<string>;
  }

  static InitiateClipWidget(widgetType: Type<BaseWidget>, metadata: WidgetMetadata) {
    DashboardService.clipWidgetsMapBySelector[metadata.id] = {
      widgetType,
      metadata,
    };
  }

  getClipWidgetBySelector(selector: string): ClipWidgetInfo {
    return DashboardService.clipWidgetsMapBySelector[selector];
  }

  async CreateDashboard(dashboard: DashboardModel): Promise<DashboardModel> {
    let res = await this.post<DashboardModel>('/dashboards', dashboard);
    return res.body!.data;
  }

  async GetDashboards(skip: number = 0, limit: number = 100): Promise<DashboardModel[]> {
    let res = await this.get<DashboardModel[]>('/dashboards/', {
      skip,
      limit,
    });
    return res.body!.data;
  }

  async GetDashboard(dashboardId: string): Promise<DashboardModel> {
    let res = await this.get<DashboardModel>('/dashboards/' + dashboardId);
    return res.body!.data;
  }

  async UpdateDashboard(dashboardId: string, dashboard: DashboardModel): Promise<DashboardModel> {
    let res = await this.put<DashboardModel>('/dashboards/' + dashboardId, dashboard);
    return res.body!.data;
  }

  async DeleteDashboard(dashboardId: string): Promise<void> {
    await this.delete('/dashboards/' + dashboardId);
  }
}
