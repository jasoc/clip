import { ChangeDetectionStrategy, Component, computed, effect, input, viewChild } from '@angular/core';
import { MatRipple, MatRippleModule, RippleRef } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { ThemeService } from '../../../services/theme.service';
import { M3IconComponent } from '../../m3-icon/m3-icon.component';

@Component({
  selector: 'm3-button',
  standalone: true,
  templateUrl: './m3-button.component.html',
  styleUrls: ['./m3-button.component.scss'],
  providers: [ThemeService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatRippleModule, M3IconComponent, MatIconModule, RouterModule],
})
export class M3ButtonComponent {
  readonly rippleDir = viewChild(MatRipple);

  private rippleRef: RippleRef | undefined;

  readonly Text = input<string | null>(null);
  readonly Icon = input<string | null>(null);
  readonly Ripple = input(true);
  readonly Type = input<'fab' | 'thin' | 'sidenav-left'>('fab');
  readonly iconFilled = input(false, { alias: 'icon-filled' });
  readonly Rippled = input(false);

  readonly hasText = computed(() => {
    const t = this.Text();
    return t != null && t !== '';
  });

  constructor() {
    effect(() => {
      const rippled = this.Rippled();
      rippled ? this.launchRipple() : this.fadeOutRipple();
    });
  }

  private launchRipple() {
    const ripple = this.rippleDir();
    if (ripple) {
      this.rippleRef = ripple.launch({
        persistent: true,
        centered: true,
      });
    }
  }

  private fadeOutRipple() {
    if (this.rippleRef) {
      this.rippleRef.fadeOut();
    }
  }
}
