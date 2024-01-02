import { AfterViewInit, ChangeDetectionStrategy, Component, Type } from '@angular/core';
import { WidgetBaseComponent } from '../base/widget-base.component';
import { ClipWidget } from '../base/widget-base.directive';
import { WidgetbaseOptions } from '../../../classes/WidgetBaseOptions';
import { InputTypes } from 'src/app/components/dynamic-form';

class LabelComponentOptions extends WidgetbaseOptions {
  text!: string;
}

@ClipWidget({
  name: "Label",
  // properties: {
  //   "text": InputTypes.string
  // }
})
@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LabelComponent extends WidgetBaseComponent {

  get props(): LabelComponentOptions | undefined {
    return this.widgetNode?.values as LabelComponentOptions;
  }

  get text(): string {
    return this.props?.text ?? "Example text";
  }
}
