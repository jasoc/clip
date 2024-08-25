import { Component, OnDestroy } from '@angular/core';
import { ClipWidget } from '../base-widget.decorator';
import { BaseClipWidget } from '../BaseClipWidget';

const selector = "clip-dashboards-widget-spacer";

@ClipWidget({
  id: selector,
  name: "spacer",
  description: "Card",
  minH: 2,
  minW: 4,
})
@Component({
  selector: selector,
  standalone: true,
  templateUrl: './dashboards-widget-spacer.component.html',
  styleUrls: ['./dashboards-widget-spacer.component.scss'],
})
export class DashboardsWidgetSpacerComponent extends BaseClipWidget<any> {
  public override getSelector(): string {
    return selector;
  }
}
