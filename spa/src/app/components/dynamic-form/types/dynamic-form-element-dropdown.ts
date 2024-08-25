import { DynamicFormElement } from "./dynamic-form-element";

export class DropdownElement extends DynamicFormElement<string> {
  override controlType = 'dropdown';
  options: { key: string; label: string }[];

  constructor(options: any) {
    super(options);
    this.options = options.options || [];
  }
}