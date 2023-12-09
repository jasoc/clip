import { Component, Injectable, QueryList, ViewChildren, ViewContainerRef } from '@angular/core';
import { WidgetBaseComponent } from '../base/widget-base.component';
import { ClipWidget } from '../base/widget-base.directive';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { WidgetNode } from '../../../classes/IWidgetNode';

@ClipWidget({
  name: "Flex box",
  icon: "flex_no_wrap",
  requestedWidth: 2
})
@Component({
  selector: 'clip-widget-flex-box',
  templateUrl: './flex-box.component.html',
  styleUrls: ['./flex-box.component.scss']
})
export class FlexBoxComponent extends WidgetBaseComponent {

  @ViewChildren('subcontainer', {read: ViewContainerRef})
  containers: QueryList<ViewContainerRef> | undefined = undefined;

  public drop(event: CdkDragDrop<WidgetNode[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex - 1, event.currentIndex - 1);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  override renderSubWidgets(): void {
    for (let i = 0; i < (this.containers?.length ?? 0); i++) {
      let container = this.containers?.get(i);
      let widgetNode = this.widgetNode?.subComponents?.at(i);
      
      if (!container || !widgetNode) {
        return;
      }

      this.dashboardService.destroyWidget(widgetNode);
      let newComponentRef = this.dashboardService.addNodeInContainer(widgetNode, container);
      let newComponent = this.dashboardService.spawnSubWidget(this.widgetNode!, widgetNode, newComponentRef);
      newComponent.forceDisableDrag = true;
    }
  }
}
