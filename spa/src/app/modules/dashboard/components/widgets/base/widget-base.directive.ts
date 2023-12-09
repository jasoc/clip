import { Type, Directive, ElementRef, Renderer2, HostListener, Input, HostBinding, SimpleChanges, OnChanges, OnInit } from '@angular/core';
import { WidgetMetadata } from "../../../classes/WidgetMetadata";
import { WidgetBaseComponent } from "./widget-base.component";
import { FlexBoxComponent } from '../flex-box/flex-box.component';
import { LabelComponent } from '../label/label.component';
import { CdkDrag } from '@angular/cdk/drag-drop';

export function ClipWidget(metadata: WidgetMetadata) {
   return function decorator(target: Type<WidgetBaseComponent>) {
      if (!metadata.requestedHeight) metadata.requestedHeight = 1;
      if (!metadata.requestedWidth) metadata.requestedWidth = 1;
      target.prototype.metadata = metadata;
   }
}

@Directive({
   selector: '[ClipWidgetRoot]'
})
export class ClipWidgetRoot extends CdkDrag implements OnInit {
   
   ngOnInit(): void {
      this.disabled = !this.instance.composerMode || this.instance.forceDisableDrag;
   }

   @Input('ClipWidgetRoot')
   instance!: WidgetBaseComponent;

   @HostBinding('class.highlighted') get isHighlighted() { return this.instance.highlighted; }

   @HostListener('cdkDragEnded', ['$event'])

   onDragEndEvent(event: any) {
      this.instance.onDragEndEvent(event);
   }

   @HostListener('click', ['$event'])
   onClick(event: any) {
      this.instance.onClick(event);
   }
}