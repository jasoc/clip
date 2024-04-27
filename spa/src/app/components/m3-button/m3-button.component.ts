import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatRipple, MatRippleModule, RippleRef } from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { M3IconComponent } from '../m3-icon/m3-icon.component';
import { simpleFade } from '../../animations/enterAndLeave';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'm3-button',
  standalone: true,
  templateUrl: './m3-button.component.html',
  styleUrls: ['./m3-button.component.scss'],
  providers: [ThemeService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatRippleModule, M3IconComponent, MatIconModule, RouterModule],

  animations: [
    trigger('ShowText', simpleFade('280ms')),
  ],
})
export class M3ButtonComponent implements AfterViewInit {

  @ViewChild('buttonLink')
  buttonLink: ElementRef<HTMLAreaElement> | null = null;

  @ViewChild(MatRipple)
  ripple: MatRipple | undefined;

  rippleRef: RippleRef | undefined;

  @Input()
  Text: string | null = null;

  @Input()
  BackgroundColor: "primary" | "accent" | string = "primary";

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
  Type: "round" | "fab" | "thin" | "sidenav-left" = "fab";

  @Input()
  Style: "primary" | "accent" | "transparent" = "primary";

  @Input()
  redirect: string | undefined = undefined;

  @Input('icon-filled')
  iconFilled: boolean = false;

  @Input('icon-weight')
  iconWeight: number = 500;

  @Input()
  set Rippled(value: boolean) {
    value ? this.launchRipple() : this.fadeOutRipple();
  }

  constructor(private themeService: ThemeService) { }

  ngAfterViewInit(): void {
    if (this.redirect) {
      // this.buttonLink?.nativeElement.setAttribute('href', this.redirect);
    }
  }

  getContrast(hexColor: string): string {
    if (hexColor == 'transparent') {
      return 'var(--clip-main-ui-text-color)';
    }
    if (hexColor.startsWith('#')) {
        hexColor = hexColor.slice(1);
    }
    const r = parseInt(hexColor.slice(0, 2), 16);
    const g = parseInt(hexColor.slice(2, 4), 16);
    const b = parseInt(hexColor.slice(4, 6), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? 'black' : 'white';
  }

  public HasText(): boolean {
    return this.Text != null && this.Text != '';
  }

  launchRipple() {
    if (this.ripple != undefined) {
      this.rippleRef = this.ripple.launch({
        persistent: true,
        centered: true,
      });
    }
  }

  fadeOutRipple() {
    if (this.rippleRef != undefined) {
      this.rippleRef.fadeOut();
    }
  }
}
