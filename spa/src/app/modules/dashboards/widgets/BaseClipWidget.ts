import { Component, ElementRef, HostListener, inject, Input, Renderer2, Type } from '@angular/core';
import { BaseWidget, NgCompInputs, NgGridStackWidget } from 'gridstack/dist/angular';
import { WidgetMetadata } from './base-widget.decorator';
import { DashboardService } from '../../../services/dashboard.service';
import { QuestionControlService } from '../../../services/question-control.service';

@Component({
  selector: 'clip-dashboards-widget-base',
  standalone: true,
  template: '',
})
export abstract class BaseClipWidget<OptionsType> extends BaseWidget {
  static currentlyHighlighted: BaseClipWidget<any> | null = null;

  public options: OptionsType;

  readonly elRef: ElementRef;
  readonly renderer: Renderer2;
  readonly dashboardService: DashboardService;
  readonly qcs: QuestionControlService;

  constructor() {
    super();
    this.elRef = inject(ElementRef);
    this.renderer = inject(Renderer2);
    this.dashboardService = inject(DashboardService);
    this.qcs = inject(QuestionControlService);
    this.options = this.qcs.getInitialOptions(this.getSelector());
  }

  // abstract getInitialOptions(): OptionsType;

  @HostListener('mousedown', ['$event'])
  handleClick(event: MouseEvent): void {
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
