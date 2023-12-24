import { Component, Injectable, QueryList, ViewChildren, ViewContainerRef } from '@angular/core';
import { WidgetBaseComponent } from '../base/widget-base.component';
import { ClipWidget } from '../base/widget-base.directive';
import { CdkDragDrop, CdkDragEnd, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { WidgetNode } from '../../../classes/IWidgetNode';

@ClipWidget({
  name: "Flex box",
  icon: "flex_no_wrap",
  canHaveSubWidgets: true,
  requestedWidth: 2
})
@Component({
  selector: 'clip-widget-flex-box',
  templateUrl: './flex-box.component.html',
  styleUrls: ['./flex-box.component.scss']
})
export class FlexBoxComponent extends WidgetBaseComponent {

  @ViewChildren('subcontainer', { read: ViewContainerRef })
  containers: QueryList<ViewContainerRef> | undefined = undefined;

}
