import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dashboard } from '../../classes/IDashboards';
import { DashboardService } from '../../dashboard.service';
import { DashboardCanvasComponent } from '../../components/dashboard-canvas/dashboard-canvas.component';
import { widgetsMap } from '../../components/widgets';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { WidgetNode } from '../../classes/WidgetNode';
import { WidgetBaseComponent } from '../../components/widgets/base/widget-base.component';
import { Subject } from 'rxjs';
import { WidgetbaseOptions } from '../../classes/WidgetBaseOptions';
import { InputInfo, InputTypes, RecursiveInputTypes } from 'src/app/components/dynamic-form';

@Component({
  selector: 'clip-dashboard-composer',
  templateUrl: './dashboard-composer.component.html',
  styleUrls: ['./dashboard-composer.component.scss'],
})
export class DashboardComposerComponent implements OnInit {

  @ViewChild('viewer', { read: DashboardCanvasComponent })
  private dashboardCanvas: DashboardCanvasComponent | null = null;

  public subjectNode: Subject<WidgetNode> = new Subject<WidgetNode>();
  public dashboard: Dashboard | undefined;
  public highlightedWidget?: WidgetBaseComponent;
  public highlightedWidgetProperties?: RecursiveInputTypes;
  public highlightedWidgetInitialValues?: { [key: string]: any };
  public widgetsMap = widgetsMap;

  constructor(public dashboardService: DashboardService, private route: ActivatedRoute, private cd: ChangeDetectorRef) { }

  updateNode(node: WidgetNode) {
    this.dashboard!.widgetsTree = node;
    this.dashboardCanvas!.renderDashboard(true);
    this.onSave();
  }

  async ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.dashboard = await this.dashboardService.getById(id);
      if (this.dashboard && this.dashboard.widgetsTree) {
        this.dashboardService.currentDashboard = this.dashboard;
        setTimeout(() => this.updateComposer());
      }
    }
  }

  onSave() {
    this.dashboardCanvas!.renderDashboard(true);
    this.dashboardService.updateDashboard(this.dashboard!);
  }

  tree() {
    console.log(this.dashboard?.widgetsTree.subComponents);
  }

  empty() {
    this.dashboard!.widgetsTree.subComponents = [];
    this.updateComposer();
    this.onSave();
  }

  onWidgetDraggedFromList(event: CdkDragEnd, widgetClassName: string) {
    if (!this.dashboard || !this.dashboardCanvas || !this.dashboardCanvas.container) return;
    let { x, y } = event.dropPoint;
    let widget: WidgetNode = {
      className: widgetClassName,
    };
    x -= this.dashboardCanvas.offsetLeft;
    y -= this.dashboardCanvas.offsetTop;
    let movingRes = this.dashboardService.getNewPositionForWidget(widget, x, y, this.dashboard, true);
    if (movingRes.overlappingWidget) {
      if (!movingRes.overlappingWidget.subComponents) {
        movingRes.overlappingWidget.subComponents = [];
      }
      movingRes.overlappingWidget.subComponents?.push(widget);
    }
    else if (movingRes.x) {
      widget.positionStartX = movingRes.x;
      widget.positionStartY = movingRes.y;
      this.dashboard.widgetsTree.subComponents?.push(widget);
      this.dashboardService.spawnWidget(this.dashboardCanvas.container, {
        widgetNode: widget,
        dashboardId: this.dashboard!.id!,
        composerMode: true,
        onDragStartEvent: (event: any) => this.onDragStartEvent(event),
        onDragEndEvent: (event: any) => this.onDragEndEvent(event),
        onClickEvent: (event: any) => this.onClickEvent(event),
      });
    }
    event.source.reset();
    this.updateComposer();
    this.onSave();
  }

  onClickEvent(event: { widgetInstance: WidgetBaseComponent, mouseEvent: MouseEvent }) {
    event.mouseEvent.stopPropagation()
    this.highlightWidget(event.widgetInstance);
    this.highlightedWidget = event.widgetInstance;
    this.highlightedWidgetProperties = widgetsMap[this.highlightedWidget?.widgetNode?.className!]?.prototype?.metadata?.properties;
    // TODO move somewhere else
    this.highlightedWidgetInitialValues = { ...this.highlightedWidget?.widgetNode?.values, ...this.highlightedWidget?.widgetNode };
    this.highlightedWidgetProperties!["defaults"] = {
      label: "Size and position",
      type: InputTypes.object,
      keys: {
        "width": { label: "Width", icon: "arrow_range", type: InputTypes.number },
        "height": { label: "Height", icon: "arrow_range", type: InputTypes.number },
        "positionStartX": { label: "Position X", icon: "arrow_range", type: InputTypes.number },
        "positionStartY": { label: "Position Y", icon: "arrow_range", type: InputTypes.number },
      }
    };
  }

  highlightWidget(widgetInstance: WidgetBaseComponent) {
    this.dashboardService.spawnedWidgetsByDashboardId[this.dashboard!.id!]
      .forEach((widgetInstance) => widgetInstance.highlighted = false);
    widgetInstance.highlighted = true;
  }

  onDragStartEvent(event: { widgetInstance: WidgetBaseComponent, cdkDragEnd: CdkDragEnd }) {
    this.highlightWidget(event.widgetInstance);
  }

  onDragEndEvent(event: { widgetInstance: WidgetBaseComponent, cdkDragEnd: CdkDragEnd }) {
    if (!this.dashboard || !this.dashboardCanvas || !this.dashboardCanvas.container) {
      return;
    }

    let { x, y } = event.cdkDragEnd.source.getFreeDragPosition();
    x = event.widgetInstance.offsetLeft + x;
    y = event.widgetInstance.offsetTop + y;

    let movingRes = this.dashboardService.getNewPositionForWidget(event.widgetInstance.widgetNode!, x, y, this.dashboard);

    if (movingRes.x) {
      event.widgetInstance.widgetNode!.positionStartX = movingRes.x;
      event.widgetInstance.widgetNode!.positionStartY = movingRes.y;
      this.dashboardService.updateDashboard(this.dashboard);
    }

    if (movingRes.overlappingWidget
      && widgetsMap[movingRes.overlappingWidget.className].prototype.metadata.canHaveSubWidgets
      && !movingRes.overlappingWidget.subComponents?.includes(event.widgetInstance.widgetNode!)) {
      if (!movingRes.overlappingWidget.subComponents) {
        movingRes.overlappingWidget.subComponents = [];
      }
      movingRes.overlappingWidget.subComponents.push(event.widgetInstance.widgetNode!);
      this.dashboard.widgetsTree.subComponents!.splice(this.dashboard.widgetsTree.subComponents!.indexOf(event.widgetInstance.widgetNode!), 1);
    }

    this.updateComposer();
    this.highlightWidget(event.widgetInstance);
    this.onSave();
  }

  updateComposer(): void {
    if (this.dashboard && this.dashboard.widgetsTree) {
      this.subjectNode.next(this.dashboard.widgetsTree);
      if (this.dashboardCanvas) {
        this.dashboardCanvas.renderDashboard(true);
      }
    }
  }

  onWidgetPropertyChanged(event: { key: string, value: any }) {
    if (!this.highlightedWidget?.widgetNode?.values) {
      this.highlightedWidget!.widgetNode!.values = {};
    }
    //TODO AAAAAAAARRGGGHHHHHH
    if (event.key == "width") {
      this.highlightedWidget!.widgetNode!.width = event.value;
    }
    else if (event.key == "height") {
      this.highlightedWidget!.widgetNode!.height = event.value;
    }
    if (event.key == "positionStartX") {
      this.highlightedWidget!.widgetNode!.positionStartX = event.value;
    }
    if (event.key == "positionStartY") {
      this.highlightedWidget!.widgetNode!.positionStartY = event.value;
    }
    else {
      this.highlightedWidget!.widgetNode!.values[event.key] = event.value;
    }
    if (this.dashboardCanvas) {
      this.dashboardCanvas.renderDashboard(true);
    }
  }
}
