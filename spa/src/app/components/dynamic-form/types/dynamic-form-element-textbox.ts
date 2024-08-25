import { DynamicFormElement } from "./dynamic-form-element";

export class TextboxElement extends DynamicFormElement<string> {
  override controlType = 'textbox';
  value: string;
  type: string;
  icon: string;

  constructor(options: any) {
    super(options);
    this.value = options.value || '';
    this.type = options.type || '';
    this.icon = options.icon || '';
  }
}