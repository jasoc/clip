import { Component, OnDestroy } from '@angular/core';
import { ClipWidget } from '../base-widget.decorator';
import { BaseClipWidget } from '../BaseClipWidget';

const selector = 'clip-dashboards-widget-card';

@ClipWidget({
  id: selector,
  name: 'Card',
  description: 'Card',
  minH: 1,
  minW: 1,
})
@Component({
  selector: selector,
  standalone: true,
  templateUrl: './dashboards-widget-card.component.html',
  styleUrls: ['./dashboards-widget-card.component.scss'],
})
export class DashboardsWidgetCardComponent extends BaseClipWidget<any> {
  public override getSelector(): string {
    return selector;
  }
}
