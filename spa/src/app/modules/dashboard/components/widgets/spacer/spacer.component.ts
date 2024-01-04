import { AfterViewInit, ChangeDetectionStrategy, Component, HostBinding, Type } from '@angular/core';
import { WidgetBaseComponent } from '../base/widget-base.component';
import { ClipWidget } from '../base/widget-base.directive';
import { InputTypes } from 'src/app/components/dynamic-form';

@ClipWidget({
  name: "Spacer",
  properties: {
    "direction": { label: "Direction", icon: "arrow_range", type: InputTypes.selector, props: { selectables: ["Horizontal", "Vertical"] } },
    "size": { label: "Size (any unit)", icon: "arrow_range", type: InputTypes.string },
  }
})
@Component({
  selector: 'app-spacer',
  templateUrl: './spacer.component.html',
  styleUrls: ['./spacer.component.scss', '../base/widget-base.component.scss']
})
export class SpacerComponent extends WidgetBaseComponent {

  @HostBinding('style.height') get height() { return this.getSpacerHeight(); }
  @HostBinding('style.width') get width() { return this.getSpacerWidth(); }

  get direction(): string {
    return this.getProperty("direction") ?? "Horizontal";
  }

  get size(): string {
    return this.getProperty("size") ?? "20px";
  }

  getSpacerHeight(): string {
    if (this.direction != "Vertical") {
      return "50px";
    }
    return this.size;
  }
  getSpacerWidth(): string {
    if (this.direction != "Horizontal") {
      return "50px";
    }
    return this.size;
  }
}