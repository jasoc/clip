import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
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
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }],
  imports: [CommonModule, MatSelectModule, MatIconModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
})
export class DynamicFormQuestionComponent {

  @Input() question!: DynamicFormElement<string>;
  @Input() form!: FormGroup;

  get isValid() {
    return this.form.controls[this.question.key].valid;
  }

  public DropdownQuestion(obj: DynamicFormElement<any>): DropdownElement {
    return obj as DropdownElement;
  }

  public TextboxQuestion(obj: DynamicFormElement<any>): TextboxElement {
    return obj as TextboxElement;
  }
}
