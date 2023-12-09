import { BackendService } from "src/app/services/backend.service";
import { Dashboard } from "./classes/IDashboards";
import { WidgetNode } from "./classes/IWidgetNode";
import { DashboardViewerComponent } from "./components/dashboard-viewer/dashboard-viewer.component";
import { WidgetBaseComponent } from "./components/widgets/base/widget-base.component";
import { ComponentRef, Type, ViewContainerRef } from "@angular/core";
import { widgetsMap } from "./components/widgets";

export class DashboardService extends BackendService {
    
    public dashboardByWidget = new Map<WidgetNode, Dashboard>();
    
    private dashboardsById: { [id: string]: Dashboard } = {};
    private dashboardRefByNode = new Map<Dashboard, DashboardViewerComponent>();
    private widgetsByDashboard = new Map<Dashboard, WidgetNode[]>();
    private widgetRefByNode = new Map<WidgetNode, ComponentRef<WidgetBaseComponent>>();

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

    public spawnDashboard(dashboard: Dashboard, dashboardComponent: DashboardViewerComponent): void {
        if(!this.dashboardRefByNode.has(dashboard)) {
            this.dashboardRefByNode.set(dashboard, dashboardComponent);
        }
    }

    public renderDashboard(dashboard: Dashboard): void {
        if(!this.dashboardRefByNode.has(dashboard)) {
            return;
        }
        this.dashboardRefByNode.get(dashboard)!.renderDashboard();
    }

    public destroyWidget(widget: WidgetNode): void {
        if (!this.widgetRefByNode.has(widget)) {
            return;
        }
        this.widgetRefByNode.get(widget)?.destroy();
        this.widgetRefByNode.delete(widget);

        let dashboard = this.dashboardByWidget.get(widget)!;
        let currWidgetLst = this.widgetsByDashboard.get(dashboard) ?? [];
        currWidgetLst.splice(currWidgetLst.indexOf(widget), 1);
        this.widgetsByDashboard.set(dashboard, currWidgetLst);
    }

    public spawnWidget(dashboard: Dashboard, widget: WidgetNode, x: number, y: number, addinNodes: boolean = false, uncertainCoordinates: boolean = false): boolean {
        if (this.tryAssignNewPositionToWidget(widget, x, y, dashboard, uncertainCoordinates)) {
            if (addinNodes) {
                dashboard.widgetsTree.subComponents?.push(widget);
            }
            let newComponentRef = this.addNodeInContainer(widget, this.dashboardRefByNode.get(dashboard)!.container!);
            this.cacheWidget(dashboard, widget, newComponentRef);
            return true;
        }
        return false;
    }

    public addNodeInContainer(widget: WidgetNode, container: ViewContainerRef): ComponentRef<WidgetBaseComponent> {
      let newComp = container.createComponent(widgetsMap[widget.className]);
      newComp.instance.widgetNode = widget;
      return newComp;
    }

    public cacheWidget(dashboard: Dashboard, widget: WidgetNode, widgetComponent: ComponentRef<WidgetBaseComponent>): void {
        if(!this.dashboardRefByNode.has(dashboard)) {
            return;
        }
        
        widgetComponent.instance.widgetNode = widget;
        widgetComponent.instance.composerMode =  this.dashboardRefByNode.get(dashboard)!.composerMode;

        this.dashboardByWidget.set(widget, dashboard);
        this.widgetRefByNode.set(widget, widgetComponent);

        let currWidgetLst = this.widgetsByDashboard.get(dashboard) ?? [];
        currWidgetLst.push(widget);
        this.widgetsByDashboard.set(dashboard, currWidgetLst);
    }

    public spawnSubWidget(parentWidget: WidgetNode, widget: WidgetNode, widgetComponent: ComponentRef<WidgetBaseComponent>): WidgetBaseComponent {
        let dashboard = this.dashboardByWidget.get(parentWidget)!;
        
        widgetComponent.instance.widgetNode = widget;
        console.log(widgetComponent.instance.widgetNode)
        widgetComponent.instance.composerMode = this.dashboardRefByNode.get(dashboard)!.composerMode;

        this.dashboardByWidget.set(widget, dashboard);
        this.widgetRefByNode.set(widget, widgetComponent);

        let currWidgetLst = this.widgetsByDashboard.get(dashboard) ?? [];
        currWidgetLst.push(widget);
        this.widgetsByDashboard.set(dashboard, currWidgetLst);
        return widgetComponent.instance;
    }

    public highlightWidget(widget: WidgetNode) {
        this.widgetsByDashboard.get(this.dashboardByWidget.get(widget)!)?.forEach((innerWidget) => {
            this.widgetRefByNode.get(innerWidget)!.instance.highlighted = false;
        });
        this.widgetRefByNode.get(widget)!.instance.highlighted = true;
    }

    public tryAssignNewPositionToWidget(widget: WidgetNode, screenX: number, screenY: number, newDashboard?: Dashboard, uncertainCoordinates: boolean = false): boolean {
        if (!this.dashboardByWidget.has(widget) && !newDashboard) {
            return false;
        }

        let widgetRef = this.widgetRefByNode.get(widget)!;
        let dashboard = this.dashboardByWidget.get(widget) ?? newDashboard!;
        let dashboardRef = this.dashboardRefByNode.get(dashboard)!;

        let dragDivisionFactor = 2;
        if (dashboardRef && !widgetRef) {
            let widgetClass = this.getWidgetClassByClassName(widget.className)?.prototype as WidgetBaseComponent | undefined;
            if (widgetClass) {
                widget.width = widgetClass.metadata.requestedWidth;
                widget.height = widgetClass.metadata.requestedHeight;
            }
            else {
                return false;
            }
            dragDivisionFactor = 4;
        }
        
        if (uncertainCoordinates) {
            screenX -= dashboardRef.offsetLeft;
            screenY -= dashboardRef.offsetTop;
        }

        let topLeftCornerOfWidgetX = dashboardRef.offsetLeft + (widgetRef?.instance?.offsetLeft ?? 0) + screenX + (dashboard.width / dashboard.columns / dragDivisionFactor);
        let topLeftCornerOfWidgetY = dashboardRef.offsetTop + (widgetRef?.instance?.offsetTop ?? 0) + screenY + (dashboard.height / dashboard.rows / dragDivisionFactor);

        let { x, y } = this.getCellFromCoordinates(dashboard, topLeftCornerOfWidgetX - dashboardRef.offsetLeft,
                                                              topLeftCornerOfWidgetY - dashboardRef.offsetTop);
        
        if (x <= 0 || x > dashboard.columns || y <= 0 || y > dashboard.rows) {
            return false;
        }

        let overlappingWidget = this.getOverlappingWidget(dashboard, x, y, widget.height!, widget.width!, widget);

        if (!overlappingWidget) {
            widget.positionStartX = x;
            widget.positionStartY = y;

            return true;
        }

        return false;
    }

    private getOverlappingWidget(dashboard: Dashboard, x: number, y: number, height: number, width: number, widgetToExclude: WidgetNode): WidgetNode | null {
        let widget: WidgetNode | null = null;
        dashboard.widgetsTree.subComponents?.forEach((subWidget) => {
            if (subWidget == widgetToExclude) return;
            let subWidgetEndX = (subWidget.positionStartX! + subWidget.width!) - 1;
            let subWidgetStartX = subWidget.positionStartX!;
            let subWidgetEndY = (subWidget.positionStartY! + subWidget.height!) - 1;
            let subWidgetStartY = subWidget.positionStartY!;
    
            let boxEndX = x + width - 1;
            let boxEndY = y + height - 1;
    
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