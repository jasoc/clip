import { AfterViewInit, ChangeDetectionStrategy, Component, Type } from '@angular/core';
import { WidgetBaseComponent } from '../base/widget-base.component';
import { ClipWidget } from '../base/widget-base.directive';
import { InputTypes } from 'src/app/components/dynamic-form';

@ClipWidget({
  name: "Label",
  properties: {
    "text": { label: "Text", icon: "arrow_range", type: InputTypes.string },
    "font-weight": { label: "Font weight", icon: "arrow_range", type: InputTypes.selector, props: { selectables: [ 300, 400, 500, 600, 700 ] } },
    "font-size": { label: "Font size (em)", icon: "arrow_range", type: InputTypes.number },
    "text-wrap": { label: "Text wrap", icon: "arrow_range", type: InputTypes.selector, props: { selectables: [ "wrap", "nowrap" ] } },
  }
})
@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss', '../base/widget-base.component.scss']
})
export class LabelComponent extends WidgetBaseComponent {

}