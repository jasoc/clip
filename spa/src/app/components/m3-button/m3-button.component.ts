import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import { simpleFade } from 'src/app/animations/enterAndLeave';

@Component({
  selector: 'm3-button',
  standalone: true,
  templateUrl: './m3-button.component.html',
  styleUrls: ['./m3-button.component.scss'],
  imports: [CommonModule, MatRippleModule, MatIconModule],

  animations: [
    trigger('ShowText', simpleFade('280ms')),
  ],
})
export class M3ButtonComponent {

  @Input()
  Text: string | null = null;
  
  @Input()
  BackgroundColor: "primary" | "accent" | string = "primary";

  @Input()
  TextColor: string | null = null;

  @Input()
  Icon: string | null = null;

  @Input()
  Elevation: number = 0;

  @Input()
  Wide: boolean = false;

  @Input()
  Ripple: boolean = true;

  @Input()
  Margin: boolean = false;

  @Input()
  Type: "round" | "fab" | "sidenav-left" = "fab";

  @Input()
  Style: "primary" | "accent" | "transparent" = "primary";

  public HasText(): boolean {
    return this.Text != null && this.Text != '';
  }
}
