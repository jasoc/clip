import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { WidgetBaseComponent } from '../base/widget-base.component';
import { ClipWidget } from '../base/widget-base.directive';

@ClipWidget({
  name: "Label"
})
@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LabelComponent extends WidgetBaseComponent {
  get text(): string {
    return this.widgetNode?.values?.text ?? "Example text";
  }
}
