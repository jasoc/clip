import { inject, Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicFormElement } from '../components/dynamic-form/types/dynamic-form-element';
import { DashboardService } from './dashboard.service';

@Injectable({ providedIn: 'root' })
export class QuestionControlService {
  readonly dashboardService: DashboardService;

  constructor() {
    this.dashboardService = inject(DashboardService);
  }

  toFormGroup(questions: DynamicFormElement<any>[], overrideValues: { [key: string]: any } = {}) {
    const group: any = {};
    questions.forEach(question => {
      const defaultValues = overrideValues[question.key] ?? question.defaultValue;
      group[question.key] = question.required
        ? new FormControl(defaultValues, Validators.required)
        : new FormControl(defaultValues);
    });
    return new FormGroup(group);
  }

  getInitialOptions(selector: string) {
    const wm = this.dashboardService.getClipWidgetBySelector(selector);
    if (wm.metadata.optionsForm) {
      const form = this.toFormGroup(wm.metadata.optionsForm);
      // TODO: maybe there is no reason to instantiate a form
      // just to take the default values of it's form controls
      return form.getRawValue();
    }
    return null;
  }
}
