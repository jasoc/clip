import { Type, Directive, ElementRef, Renderer2, HostListener, Input, HostBinding, SimpleChanges, OnChanges, OnInit } from '@angular/core';
import { WidgetMetadata } from "../../../classes/WidgetMetadata";
import { WidgetBaseComponent } from "./widget-base.component";
import { CdkDrag, CdkDragEnd, CdkDragStart } from '@angular/cdk/drag-drop';

export function ClipWidget(metadata: WidgetMetadata) {
   return function decorator(target: Type<WidgetBaseComponent>) {
      if (!metadata.requestedHeight) {
         metadata.requestedHeight = 1;
      }
      if (!metadata.requestedWidth) {
         metadata.requestedWidth = 1;
      }
      if (!metadata.canHaveSubWidgets) {
         metadata.canHaveSubWidgets = false;
      }

      target.prototype.metadata = metadata;
   }
}

@Directive({
   selector: '[ClipWidgetRoot]'
})
export class ClipWidgetRoot extends CdkDrag implements OnInit {
   
   ngOnInit(): void {
      this.disabled = !this.instance.composerMode;
   }
   
   @HostBinding('class.highlighted') get isHighlighted() { return this.instance.highlighted; }
   @HostBinding('class.clip-widget') get cw() { return true; }

   @Input('ClipWidgetRoot')
   instance!: WidgetBaseComponent;

   @HostListener('cdkDragStarted', ['$event'])
   onDragStartEvent(event: CdkDragStart) {
       this.instance.onDragStartEvent({ widgetInstance: this.instance, cdkDragEnd: event });
   }

   @HostListener('cdkDragEnded', ['$event'])
   onDragEndEvent(event: CdkDragEnd) {
       this.instance.onDragEndEvent({ widgetInstance: this.instance, cdkDragEnd: event });
   }
   
   @HostListener('click', ['$event'])
   onClickEvent(event: MouseEvent) {
       this.instance.onClickEvent({ widgetInstance: this.instance, mouseEvent: event });
   }
}