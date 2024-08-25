export class DynamicFormElement<T> {
  defaultValue: any;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;

  constructor(
    options: {
      defaultValue?: T;
      key?: string;
      label?: string;
      required?: boolean;
      order?: number;
      controlType?: string;
      type?: string;
    } = {}
  ) {
    this.defaultValue = options.defaultValue || '';
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
  }
}
