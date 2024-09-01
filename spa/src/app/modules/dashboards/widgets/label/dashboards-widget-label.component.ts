import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';

import { DropdownElement } from '../../../../components/dynamic-form/types/dynamic-form-element-dropdown';
import { TextboxElement } from '../../../../components/dynamic-form/types/dynamic-form-element-textbox';
import { ClipWidget } from '../base-widget.decorator';
import { BaseClipWidget } from '../BaseClipWidget';

const selector = 'clip-dashboards-widget-label';

interface LabelOptions {
  content: string;
  size: string;
}

@ClipWidget({
  id: selector,
  name: 'Label',
  description: 'Label',
  minH: 2,
  minW: 3,
  optionsForm: [
    new TextboxElement({
      key: 'content',
      defaultValue: 'Example',
      icon: 'menu_book',
      label: 'Content',
      required: true,
      order: 1,
    }),
    new DropdownElement({
      key: 'size',
      defaultValue: 'small',
      icon: 'menu_book',
      label: 'Size',
      required: true,
      order: 1,
      options: [
        {
          key: 'small',
          label: 'Small',
        },
        {
          key: 'medium',
          label: 'Medium',
        },
        {
          key: 'big',
          label: 'Big',
        },
      ],
    }),
  ],
})
@Component({
  selector: selector,
  standalone: true,
  templateUrl: './dashboards-widget-label.component.html',
  styleUrls: ['./dashboards-widget-label.component.scss'],
  imports: [FormsModule, MatIconModule, MatButtonModule, MatSlideToggleModule, MatSliderModule],
})
export class DashboardsWidgetLabelComponent extends BaseClipWidget<LabelOptions> {
  public override getSelector(): string {
    return selector;
  }
}
