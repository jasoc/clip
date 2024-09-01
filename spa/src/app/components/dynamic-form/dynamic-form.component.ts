import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QuestionControlService } from '../../services/question-control.service';
import { DynamicFormQuestionComponent } from './dynamic-form-question.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DynamicFormRoot } from './types/dynamic-form';

@Component({
  standalone: true,
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [QuestionControlService],
  imports: [CommonModule, DynamicFormQuestionComponent, ReactiveFormsModule, MatButtonModule, MatIconModule],
})
export class DynamicFormComponent implements OnInit {
  @Input()
  questions: DynamicFormRoot | null = [];

  @Input()
  overrideValues: object = {};

  @Output()
  valuesChange = new EventEmitter<object>();

  form!: FormGroup;

  constructor(private qcs: QuestionControlService) {}

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions!, this.overrideValues);
    this.form.valueChanges.subscribe(values => {
      if (this.form.valid) {
        this.valuesChange.emit(values);
      }
    });
  }
}
