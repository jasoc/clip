import { Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dashboard } from '../../classes/IDashboards';
import { DashboardService } from '../../dashboard.service';
import { DashboardViewerComponent } from '../../components/dashboard-viewer/dashboard-viewer.component';
import { widgetsMap } from '../../components/widgets';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { WidgetNode } from '../../classes/IWidgetNode';

@Component({
  selector: 'clip-dashboard-composer',
  templateUrl: './dashboard-composer.component.html',
  styleUrls: ['./dashboard-composer.component.scss']
})
export class DashboardComposerComponent implements OnInit {
  
  @ViewChild('viewer', { read: DashboardViewerComponent })
  dashboardViewer: DashboardViewerComponent | null = null;
  
  @ViewChild('viewer', { read: ElementRef })
  dashboardViewerEl: ElementRef | null = null;
  
  public currentDashboard: Promise<Dashboard | undefined> | undefined;
  public dashboard: Dashboard | undefined;
  widgetsMap = widgetsMap;
  
  constructor(private dashboardService: DashboardService, private route: ActivatedRoute) { }
  
  updateNode(node: WidgetNode) {
    console.log(node)
    this.dashboard!.widgetsTree = node;
    this.dashboardService.renderDashboard(this.dashboard!);
  }

  async ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.dashboard = await this.dashboardService.getById(id);
    }
  }

  onSave() {
    this.dashboardService.renderDashboard(this.dashboard!);
    this.dashboardService.updateDashboard(this.dashboard!);
  }

  tree() {
    console.log(this.dashboard?.widgetsTree.subComponents)
  }

  empty() {
    this.dashboard!.widgetsTree.subComponents = [];
    this.dashboardService.renderDashboard(this.dashboard!);
  }

  onWidgetDraggedFromList(event: CdkDragEnd, widgetClassName: string) {
    let { x, y } = event.dropPoint;
    let widgetNode: WidgetNode = {
      className: widgetClassName,
    };
    if (this.dashboardService.spawnWidget(this.dashboard!, widgetNode, x, y, true, true)) {
      
    }
    this.dashboardService.renderDashboard(this.dashboard!);
    event.source.reset(); 
  }
}
