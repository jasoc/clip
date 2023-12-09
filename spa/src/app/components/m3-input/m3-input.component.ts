import {Component, Input, Output, EventEmitter, HostBinding, AfterViewInit} from '@angular/core';
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
import { M3IconComponent } from '../m3-icon/m3-icon.component';

@Component({
  selector: 'm3-input',
  standalone: true,
  templateUrl: './m3-input.component.html',
  styleUrls: ['./m3-input.component.scss'],
  imports: [CommonModule, MatIconModule, FormsModule, M3IconComponent],
  animations: [
    trigger('placeholderAnimated', [
      state('static', style({
        top: '*',
      })),
      state('moved', style({
        fontSize: '10px',
        fontWeight: '600',
        top: '-2px',
      })),
      transition('* <=> *', [
        animate('280ms cubic-bezier(0.18, 0.89, 0.32, 1)'),
      ]),
    ]),
  ],
})
export class M3InputComponent implements AfterViewInit {
    @Input()
    placeholder: string = 'Placeholder example';

    @Input()
    color: string = 'royalblue';

    @Input('left-icon')
    leftIcon?: string;

    @Input()
    icon?: string;

    @Input()
    hint?: string;

    @Input()
    text?: any;

    @Input('type')
    Type: string = "text";

    @HostBinding('style.width')
    @Input()
    width: string = 'auto';

    @Input('input-style')
    inputStyle: 'normal' | 'round' | 'search' = "normal";

    @Output()
    textChange = new EventEmitter<any>();

    public colored: boolean = false;
    public placeholderAnimated: boolean = false;

    constructor() { }

    ngAfterViewInit(): void {
      if (this.text && this.text.length > 0) {
        this.placeholderAnimated = true;
      }
    }

    getInputWidth(): number {
      let calc = 0;
      if (this.icon) {
        calc += 40;
      }
      if (this.leftIcon) {
        calc += 40;
      }
      return calc;
    }

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
      if (!this.placeholderAnimated && this.inputStyle != 'search') return '';
      return this.placeholder;
    }

    getPlaceholderColor(): string {
      if (this.placeholderAnimated) {
        return this.colored ? this.getContrast(this.color) : this.getContrast('#6b6b6b');
      }
      return this.colored ? this.color : 'var(--clip-background-shader-stronger)';
    }

    getContrast(hexColor: string): string {
      if (hexColor.startsWith('#')) {
          hexColor = hexColor.slice(1);
      }
      const r = parseInt(hexColor.slice(0, 2), 16);
      const g = parseInt(hexColor.slice(2, 4), 16);
      const b = parseInt(hexColor.slice(4, 6), 16);
      const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
      return (yiq >= 128) ? 'black' : 'white';
    }

    getPlaceholderBackground(): string {
      if (!this.colored) {
        return this.placeholderAnimated ? '#6b6b6b' : 'transparent';
      }
      return this.placeholderAnimated ? this.color : 'transparent';
    }
}
