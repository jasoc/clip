import {Component, Input, Output, EventEmitter} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition}
  from '@angular/animations';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'm3-input',
  standalone: true,
  templateUrl: './m3-input.component.html',
  styleUrls: ['./m3-input.component.scss'],
  imports: [CommonModule, MatIconModule, FormsModule],
  animations: [
    trigger('placeholderAnimated', [
      state('static', style({
        fontSize: '*',
        top: '*',
        left: '*',
        background: '*',
      })),
      state('moved', style({
        fontSize: '13px',
        top: '-15px',
        left: '5px',
        background: 'solid',
      })),
      transition('* <=> *', [
        animate('280ms cubic-bezier(0.18, 0.89, 0.32, 1)'),
      ]),
    ]),
  ],
})
export class M3InputComponent {
    @Input()
    placeholder: string = 'Placeholder example';

    @Input()
    color: string = 'royalblue';

    @Input()
    icon: string = "";

    @Input()
    hint: string = "";

    @Input()
    text: string = "";

    @Input()
    width: string = 'big' || 'medium' || 'small';

    @Input()
    style: 'normal' | 'round' | 'search' = "normal";

    @Output()
    textChange = new EventEmitter<string>();

    public colored: boolean = false;
    public placeholderAnimated: boolean = false;

    constructor() { }

    onFocus(event: Event) {
      this.placeholderAnimated = true;
      this.colored = true;
    }

    onFocusOut(event: Event) {
      if (!this.text) {
        this.placeholderAnimated = false;
        this.colored = false;
        return;
      }

      if (this.text.length > 0) {
        this.placeholderAnimated = true;
        this.colored = false;
        return;
      }
    }

    getPlaceholder() {
      if (!this.placeholderAnimated && this.style != 'search') return '';
      return this.placeholder;
    }
}
