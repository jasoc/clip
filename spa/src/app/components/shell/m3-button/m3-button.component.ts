import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatRipple, MatRippleModule, RippleRef } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { simpleFade } from '../../../animations/enterAndLeave';
import { ThemeService } from '../../../services/theme.service';
import { M3IconComponent } from '../../m3-icon/m3-icon.component';

@Component({
  selector: 'm3-button',
  standalone: true,
  templateUrl: './m3-button.component.html',
  styleUrls: ['./m3-button.component.scss'],
  providers: [ThemeService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatRippleModule, M3IconComponent, MatIconModule, RouterModule],

  animations: [
    trigger('ShowText', simpleFade('200ms')),
    trigger('marginLeft', [
      transition('false <=> true', animate('280ms cubic-bezier(0.18, 0.89, 0.32, 1)')),
      state(
        'false',
        style({
          marginLeft: '9px',
          marginRight: '0px',
        })
      ),
      state(
        'true',
        style({
          marginLeft: '16px',
          marginRight: '24px',
        })
      ),
    ]),
    trigger('spaced', [
      transition('false <=> true', animate('280ms cubic-bezier(0.18, 0.89, 0.32, 1)')),
      state(
        'false',
        style({
          justifyContent: 'center',
        })
      ),
      state(
        'true',
        style({
          justifyContent: 'space-between',
        })
      ),
    ]),
  ],
})
export class M3ButtonComponent {
  @ViewChild('buttonLink')
  buttonLink: ElementRef<HTMLAreaElement> | null = null;

  @ViewChild(MatRipple)
  ripple: MatRipple | undefined;

  rippleRef: RippleRef | undefined;

  @Input()
  Text: string | null = null;

  @Input()
  Icon: string | null = null;

  @Input()
  Ripple: boolean = true;

  @Input()
  Type: 'fab' | 'thin' | 'sidenav-left' = 'fab';

  @Input('icon-filled')
  iconFilled: boolean = false;

  @Input()
  set Rippled(value: boolean) {
    value ? this.launchRipple() : this.fadeOutRipple();
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
