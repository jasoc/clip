import { BaseWidget, NgCompInputs, NgGridStackWidget } from 'gridstack/dist/angular';

import { Component, ElementRef, inject, Renderer2 } from '@angular/core';

import { DashboardService } from '../../../services/dashboard.service';
import { QuestionControlService } from '../../../services/question-control.service';

@Component({
  selector: 'clip-dashboards-widget-base',
  standalone: true,
  template: '',
  host: {
    '(mousedown)': 'handleClick($event)',
  },
})
export abstract class BaseClipWidget<OptionsType> extends BaseWidget {
  static currentlyHighlighted: BaseClipWidget<any> | null = null;

  public options: OptionsType;

  readonly elRef = inject(ElementRef);
  readonly renderer = inject(Renderer2);
  readonly dashboardService = inject(DashboardService);
  readonly qcs = inject(QuestionControlService);

  constructor() {
    super();
    this.options = this.qcs.getInitialOptions(this.getSelector());
  }

  handleClick(_: MouseEvent): void {
    if (this.dashboardService.onWidgetClickInComposerCallback) {
      this.dashboardService.onWidgetClickInComposerCallback(this);
    }
  }

  highlight() {
    if (BaseClipWidget.currentlyHighlighted) {
      BaseClipWidget.currentlyHighlighted.removeHighlight();
    }
    BaseClipWidget.currentlyHighlighted = this;
    this.renderer.addClass(this.elRef.nativeElement, 'highlighted');
  }

  removeHighlight() {
    this.renderer.removeClass(this.elRef.nativeElement, 'highlighted');
  }

  override serialize(): NgCompInputs | undefined {
    return this.options as NgCompInputs;
  }

  override deserialize(w: NgGridStackWidget): void {
    if (w.input) {
      this.options = w.input as OptionsType;
    }
  }

  public abstract getSelector(): string;
}
