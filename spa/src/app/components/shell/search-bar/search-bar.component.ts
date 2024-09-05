import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'search-bar',
  standalone: true,
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  imports: [CommonModule, MatIconModule, MatRippleModule, FormsModule],
  animations: [
    trigger('contextMenuOpen', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translate(-50%, -50px)',
        }),
        animate(
          '280ms cubic-bezier(0.18, 0.89, 0.32, 1)',
          style({
            opacity: 1,
            transform: 'translate(-50%, 0px)',
          })
        ),
      ]),
      transition(':leave', [
        animate(
          '280ms cubic-bezier(0.18, 0.89, 0.32, 1)',
          style({
            opacity: 0,
            transform: 'translate(-50%, -50px)',
          })
        ),
      ]),
    ]),
  ],
})
export class SearchBarComponent {
  @Input()
  text: string = '';

  @Output()
  textChange = new EventEmitter<string>();

  public colored: boolean = false;
  public contextMenuOpen: boolean = false;

  constructor() {}

  onFocus(event: Event) {
    this.contextMenuOpen = true;
    this.colored = true;
  }

  onFocusOut(event: Event) {
    if (!this.text) {
      this.contextMenuOpen = false;
      this.colored = false;
      return;
    }

    if (this.text.length > 0) {
      this.contextMenuOpen = true;
      this.colored = false;
      return;
    }
  }
}
