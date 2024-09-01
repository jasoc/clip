import { Component, Input, OnDestroy } from '@angular/core';
import { ClipWidget, WidgetMetadata } from '../base-widget.decorator';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { BaseClipWidget } from '../BaseClipWidget';
import { TextboxElement } from '../../../../components/dynamic-form/types/dynamic-form-element-textbox';
import { DropdownElement } from '../../../../components/dynamic-form/types/dynamic-form-element-dropdown';

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
