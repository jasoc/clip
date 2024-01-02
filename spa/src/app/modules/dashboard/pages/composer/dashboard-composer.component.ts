import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dashboard } from '../../classes/IDashboards';
import { DashboardService } from '../../dashboard.service';
import { DashboardViewerComponent } from '../../components/dashboard-viewer/dashboard-viewer.component';
import { widgetsMap } from '../../components/widgets';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { WidgetNode } from '../../classes/WidgetNode';
import { WidgetBaseComponent } from '../../components/widgets/base/widget-base.component';
import { Subject } from 'rxjs';
import { WidgetbaseOptions } from '../../classes/WidgetBaseOptions';
import { RecursiveInputTypes } from 'src/app/components/dynamic-form';

@Component({
  selector: 'clip-dashboard-composer',
  templateUrl: './dashboard-composer.component.html',
  styleUrls: ['./dashboard-composer.component.scss'],
})
export class DashboardComposerComponent implements OnInit {

  @ViewChild('viewer', { read: DashboardViewerComponent })
  private dashboardViewer: DashboardViewerComponent | null = null;

  public subjectNode: Subject<WidgetNode> = new Subject<WidgetNode>();
  public dashboard: Dashboard | undefined;
  public highlightedWidget?: WidgetBaseComponent;
  public widgetsMap = widgetsMap;

  constructor(private dashboardService: DashboardService, private route: ActivatedRoute, private cd: ChangeDetectorRef) { }

  updateNode(node: WidgetNode) {
    this.dashboard!.widgetsTree = node;
    this.dashboardViewer!.renderDashboard();
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
    this.dashboardViewer!.renderDashboard();
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
    if (!this.dashboard || !this.dashboardViewer || !this.dashboardViewer.container) return;
    let { x, y } = event.dropPoint;
    let widget: WidgetNode = {
      className: widgetClassName,
    };
    x -= this.dashboardViewer.offsetLeft;
    y -= this.dashboardViewer.offsetTop;
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
      this.dashboardService.spawnWidget(this.dashboardViewer.container, {
        widgetNode: widget,
        composerMode: true,
        onDragEndEvent: (event: any) => this.onDragEndEvent(event),
        onClickEvent: (event: any) => this.onClickEvent(event),
      });
    }
    event.source.reset();
    this.updateComposer();
    this.onSave();
  }

  onClickEvent(event: { widgetInstance: WidgetBaseComponent, mouseEvent: MouseEvent }) {
    this.dashboardViewer?.spawnedWidgets.forEach((widgetInstance) => widgetInstance.highlighted = false);
    event.widgetInstance.highlighted = true;
    this.highlightedWidget = event.widgetInstance;
  }

  onDragEndEvent(event: { widgetInstance: WidgetBaseComponent, cdkDragEnd: CdkDragEnd }) {
    if (!this.dashboard || !this.dashboardViewer || !this.dashboardViewer.container) {
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

    if (movingRes.overlappingWidget && widgetsMap[movingRes.overlappingWidget.className].prototype.metadata.canHaveSubWidgets) {
      if (!movingRes.overlappingWidget.subComponents) {
        movingRes.overlappingWidget.subComponents = [];
      }
      movingRes.overlappingWidget.subComponents.push(event.widgetInstance.widgetNode!);
      this.dashboard.widgetsTree.subComponents!.splice(this.dashboard.widgetsTree.subComponents!.indexOf(event.widgetInstance.widgetNode!), 1);
    }

    this.updateComposer();
    this.onSave();
  }

  updateComposer(): void {
    if (this.dashboard && this.dashboard.widgetsTree) {
      this.subjectNode.next(this.dashboard.widgetsTree);
      if (this.dashboardViewer) {
        this.dashboardViewer.renderDashboard();
      }
    }
  }
    
  getHighlightedWidgetProperties() {
    let propertyClass: RecursiveInputTypes = widgetsMap[this.highlightedWidget?.widgetNode?.className!]?.prototype?.metadata?.properties;
    return propertyClass;
  }

  onWidgetPropertyChanged(event: { key: string, value: string }) {
    console.log(event)
    if (!this.highlightedWidget?.widgetNode?.values) {
      this.highlightedWidget!.widgetNode!.values = { };
    }
    this.highlightedWidget!.widgetNode!.values[event.key] = event.value;
    console.log(this.highlightedWidget!.widgetNode!.values)
  }
}
