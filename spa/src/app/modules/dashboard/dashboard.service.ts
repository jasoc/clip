import { BackendService } from "src/app/services/backend.service";
import { Dashboard } from "./classes/IDashboards";
import { WidgetNode } from "./classes/WidgetNode";
import { DashboardViewerComponent } from "./components/dashboard-viewer/dashboard-viewer.component";
import { WidgetBaseComponent, WidgetBaseInitArgs } from "./components/widgets/base/widget-base.component";
import { ComponentRef, Type, ViewContainerRef } from "@angular/core";
import { widgetsMap } from "./components/widgets";
import { CdkDragEnd } from "@angular/cdk/drag-drop";

type PositionAssignmentResult = {
    x?: number;
    y?: number;
    overlappingWidget?: WidgetNode;
}

export class DashboardService extends BackendService {
    
    public dashboardByWidget = new Map<WidgetNode, Dashboard>();
    
    public currentDashboard?: Dashboard;

    private dashboardsById: { [id: string]: Dashboard } = {};

    public async createDashboard(dashboard: Dashboard) {
        await this.post('dashboards/create', dashboard);
    }

    public async updateDashboard(dashboard: Dashboard) {
        dashboard.json_grid = JSON.stringify(dashboard.widgetsTree);
        await this.post('dashboards/update', dashboard);
    }
    
    public async getAll(): Promise<Dashboard[]> {
        let res = (await this.get<Dashboard[]>('dashboards')).body ?? [];
        res.forEach((x) => {
            x.widgetsTree = JSON.parse(x.json_grid);
            this.dashboardsById[x.id] = x;
        });
        return res;
    }
    
    public async getById(id: string): Promise<Dashboard | undefined> {
        if (!this.dashboardsById[id]) {
            await this.getAll();
        }
        return this.dashboardsById[id];
    }
    
    public getWidgetClassByClassName(className: string): Type<WidgetBaseComponent> | undefined {
        return widgetsMap[className];
    }

    public addNodeInContainer(widget: WidgetNode, container: ViewContainerRef): ComponentRef<WidgetBaseComponent> {
      let newComp = container.createComponent(widgetsMap[widget.className]);
      newComp.instance.widgetNode = widget;
      return newComp;
    }

    public spawnWidget(container: ViewContainerRef, widgetInitOptions: WidgetBaseInitArgs): ComponentRef<WidgetBaseComponent> {
        let newComponentRef = this.addNodeInContainer(widgetInitOptions.widgetNode, container);
        newComponentRef.instance.init(widgetInitOptions);
        return newComponentRef;
    }

    public getNewPositionForWidget(widget: WidgetNode, screenX: number, screenY: number, dashboard : Dashboard, isNewWidget: boolean = false): PositionAssignmentResult {

        let widgetClass = this.getWidgetClassByClassName(widget.className)?.prototype as WidgetBaseComponent | undefined;
        if (widgetClass) {
            widget.width = widgetClass.metadata.requestedWidth ?? 1;
            widget.height = widgetClass.metadata.requestedHeight ?? 1;
        }
        else {
            return { };
        }

        let topLeftCornerOfWidgetX = screenX;
        let topLeftCornerOfWidgetY = screenY;

        if (!isNewWidget) {
            topLeftCornerOfWidgetX += (dashboard.width / dashboard.columns / 2);
            topLeftCornerOfWidgetY += (dashboard.height / dashboard.rows / 2);
        }
        
        let { x, y } = this.getCellFromCoordinates(dashboard, topLeftCornerOfWidgetX, topLeftCornerOfWidgetY);

        if (x <= 0 || x > dashboard.columns || y <= 0 || y > dashboard.rows) {
            return { };
        }

        let overlappingWidget = this.getOverlappingWidget(dashboard, x, y, widget.height!, widget.width!, widget);

        if (!overlappingWidget) {
            widget.positionStartX = x;
            widget.positionStartY = y;
            return { x, y }
        }

        return { overlappingWidget }
    }

    private getOverlappingWidget(dashboard: Dashboard, x: number, y: number, height: number, width: number, widgetToExclude: WidgetNode): WidgetNode | null {
        let widget: WidgetNode | null = null;
        dashboard.widgetsTree.subComponents?.forEach((subWidget) => {
            if (subWidget == widgetToExclude) return;
            let subWidgetEndX = (subWidget.positionStartX! + subWidget.width!) - 1;
            let subWidgetStartX = subWidget.positionStartX!;
            let subWidgetEndY = (subWidget.positionStartY! + subWidget.height!) - 1;
            let subWidgetStartY = subWidget.positionStartY!;
    
            let boxEndX = x + (width ?? 1) - 1;
            let boxEndY = y + (height ?? 1) - 1;
    
            if ((x <= subWidgetEndX && boxEndX >= subWidgetStartX) 
             && (y <= subWidgetEndY && boxEndY >= subWidgetStartY)) {
                widget = subWidget;
                return;
            }
        });
    
        return widget;
    }

    private getCellFromCoordinates(dashboard: Dashboard, x: number, y: number): { x: number, y: number } {
        let cellWidth = dashboard.width / dashboard.columns;
        let cellheight = dashboard.height / dashboard.rows;
        let foundY = -1;
        let foundX = -1;
        for (let i = 0; i <= dashboard.columns; i++) {
          if (x <= i * cellWidth) {
            foundX = i;
            break;
          }
        }
        for (let i = 0; i <= dashboard.rows; i++) {
          if (y <= i * cellheight) {
            foundY = i;
            break;
          }
        }
        return { x: foundX, y: foundY};
    }
}