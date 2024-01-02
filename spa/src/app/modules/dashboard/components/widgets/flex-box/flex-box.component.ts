import { Component, QueryList, ViewChildren, ViewContainerRef } from '@angular/core';
import { WidgetBaseComponent } from '../base/widget-base.component';
import { ClipWidget } from '../base/widget-base.directive';
import { InputTypes } from 'src/app/components/dynamic-form';

@ClipWidget({
  name: "Flex box",
  icon: "flex_no_wrap",
  canHaveSubWidgets: true,
  requestedWidth: 2,
  properties: {
    "flex-direction": { label: "Flex Direction", type: InputTypes.string },
    "justify-content": { label: "Justify Content", type: InputTypes.string },
    "align-items": { label: "Align Items", type: InputTypes.string },
  }
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
