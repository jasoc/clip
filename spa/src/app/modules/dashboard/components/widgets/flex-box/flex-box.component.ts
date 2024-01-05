import { Component, HostBinding, QueryList, ViewChildren, ViewContainerRef } from '@angular/core';
import { WidgetBaseComponent } from '../base/widget-base.component';
import { ClipWidget } from '../base/widget-base.directive';
import { InputTypes } from 'src/app/components/dynamic-form';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { WidgetNode } from '../../../classes/WidgetNode';

@ClipWidget({
  name: "Flex box",
  icon: "flex_no_wrap",
  canHaveSubWidgets: true,
  requestedHeight: 2,
  requestedWidth: 4,
  properties: {
    "alignment": {
      label: "Alignments",
      type: InputTypes.object,
      keys: {
        "flex-direction": {
          label: "Flex Direction", icon: "arrow_range", type: InputTypes.selector,
          props: {
            selectables: ["column", "row"]
          }
        },
        "justify-content": {
          label: "Justify Content", icon: "align_justify_flex_end", type: InputTypes.selector,
          props: {
            selectables: ["flex-start", "center", "space-between", "space-around", "space-evenly", "flex-end"]
          }
        },
        "align-items": {
          label: "Align Items", icon: "align_end", type: InputTypes.selector,
          props: {
            selectables: ["flex-start", "center", "space-between", "space-around", "space-evenly", "flex-end"]
          }
        },
      }
    },
    "grows": {
      label: "Growing",
      type: InputTypes.object,
      keys: {
        "width-perc": { label: "Width %", icon: "arrow_range", type: InputTypes.number },
        "height-perc": { label: "Height %", icon: "arrow_range", type: InputTypes.number }
      }
    }
  }
})
@Component({
  selector: 'clip-widget-flex-box',
  templateUrl: './flex-box.component.html',
  styleUrls: ['./flex-box.component.scss', '../base/widget-base.component.scss']
})
export class FlexBoxComponent extends WidgetBaseComponent {

  @HostBinding('style.width.%') get width() { return this.getProperty("width-perc") ?? 100 }
  @HostBinding('style.height.%') get height() { return this.getProperty("height-perc") ?? 100 }

  @ViewChildren('subcontainer', { read: ViewContainerRef })
  containers: QueryList<ViewContainerRef> | undefined = undefined;

  override renderSubWidgets(): void {
    if (this.containers && this.widgetNode!.subComponents && this.widgetNode!.subComponents.length > 0) {
      this.containers!.forEach((container, i) => {
        container.clear();
        let w = this.dashboardService.spawnWidget(container, {
          widgetNode: this.widgetNode!.subComponents![i],
          dashboardId: this.dashboardId,
          composerMode: this.composerMode,
          onDragStartEvent: this.onDragStartEvent,
          onDragEndEvent: this.onDragEndEvent,
          onClickEvent: this.onClickEvent,
        });
        w.instance.forceDisableDrag = true;
      });
    }
  }

  dropSubWidget(event: CdkDragDrop<WidgetNode[] | undefined>) {
    console.log(event.container.data)
    if (!event.container.data || !event.previousContainer.data) {
      return;
    }
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    setTimeout(() => this.renderSubWidgets());
  }
}
