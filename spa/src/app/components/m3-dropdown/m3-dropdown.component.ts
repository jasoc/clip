import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output, ViewChild } from "@angular/core";
import { M3InputComponent } from "../m3-input/m3-input.component";
import { CommonModule } from "@angular/common";
import { MatRippleModule } from "@angular/material/core";

@Component({
  selector: 'm3-dropdown',
  standalone: true,
  templateUrl: './m3-dropdown.component.html',
  styleUrls: ['./m3-dropdown.component.scss'],
  imports: [CommonModule, MatRippleModule, M3InputComponent]
})
export class M3DropdownComponent {

  @Input()
  choices: string[] = [];

  @Input()
  choice?: string;

  @Input()
  placeholder?: string;

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

  @Input()
  readonly: boolean = false;

  @Input('type')
  Type: string = "text";

  @Input('input-style')
  inputStyle: 'normal' | 'round' | 'search' = "normal";

  @HostBinding('style.width')
  @Input()
  width: string = 'auto';

  @Output()
  choiceChange = new EventEmitter<string>();

  dropdownOpened: boolean = false;

  @HostListener('document:click', ['$event'])
  clickout(event: MouseEvent) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.dropdownOpened = false;
      this.onFocusOut();
    }
  }

  @ViewChild('m3Input', { read: M3InputComponent })
  private m3Input: M3InputComponent | null = null;

  constructor(private eRef: ElementRef) { }

  ngAfterViewInit() {
    this.m3Input!.onFocusOut = this.onFocusOut;
  }

  onInputClick(event: MouseEvent) {
    if (!this.m3Input) return;

    if (!this.dropdownOpened) {
      this.dropdownOpened = true;
      this.onFocus();
    }
    else {
      this.dropdownOpened = false;
      this.onFocusOut();
    }
  }

  onFocus() {
    if (!this.m3Input) return;
    this.m3Input.placeholderAnimated = true;
    this.m3Input.colored = true;
  }

  onFocusOut() {
    if (this.m3Input && this.choice == undefined) {
      this.m3Input.placeholderAnimated = false;
      this.m3Input.colored = false;
      return;
    } 
    if (this.m3Input && this.choice && this.choice.toString().length > 0) {
      this.m3Input.placeholderAnimated = true;
      this.m3Input.colored = false;
      return;
    }
  }

  onNewChoiceClick(choice: string) {
    this.dropdownOpened = false;
    this.choice = choice;
    this.choiceChange.emit(choice);
  }
}