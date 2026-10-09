import { ChangeDetectionStrategy, Component, effect, inject, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { QuestionControlService } from '../../services/question-control.service';
import { DynamicFormQuestionComponent } from './dynamic-form-question.component';
import { DynamicFormRoot } from './types/dynamic-form';

@Component({
  standalone: true,
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [QuestionControlService],
  imports: [DynamicFormQuestionComponent, ReactiveFormsModule, MatButtonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormComponent {
  readonly questions = input<DynamicFormRoot | null>([]);
  readonly overrideValues = input<object>({});
  readonly valuesChange = output<object>();

  form!: FormGroup;

  private readonly qcs = inject(QuestionControlService);

  constructor() {
    effect((onCleanup) => {
      const questions = this.questions();
      const overrides = this.overrideValues();
      if (questions) {
        this.form = this.qcs.toFormGroup(questions, overrides);
        const sub = this.form.valueChanges.subscribe((values) => {
          if (this.form.valid) {
            this.valuesChange.emit(values);
          }
        });
        onCleanup(() => sub.unsubscribe());
      }
    });
  }
}
