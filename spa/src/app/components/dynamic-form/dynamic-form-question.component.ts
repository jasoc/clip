import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { DynamicFormElement } from './types/dynamic-form-element';
import { DropdownElement } from './types/dynamic-form-element-dropdown';
import { TextboxElement } from './types/dynamic-form-element-textbox';
@Component({
  standalone: true,
  selector: 'app-question',
  templateUrl: './dynamic-form-question.component.html',
  styleUrl: './dynamic-form-question.component.scss',
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline',
      },
    },
  ],
  imports: [MatSelectModule, MatIconModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormQuestionComponent {
  readonly question = input.required<DynamicFormElement<string>>();
  readonly form = input.required<FormGroup>();

  readonly isValid = computed(() => this.form().controls[this.question().key]?.valid ?? true);

  DropdownQuestion(obj: DynamicFormElement<any>): DropdownElement {
    return obj as DropdownElement;
  }

  TextboxQuestion(obj: DynamicFormElement<any>): TextboxElement {
    return obj as TextboxElement;
  }
}
