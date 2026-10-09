import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { M3CardAction } from '../../domain';

@Component({
  selector: 'm3-card',
  templateUrl: './m3-card.component.html',
  styleUrls: ['./m3-card.component.scss'],
  imports: [MatRippleModule, MatButtonModule, MatIconModule, RouterModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class M3CardComponent {
  readonly title = input('Title');
  readonly link = input<string | undefined>();
  readonly subTitle = input('Sub title');
  readonly titleIcon = input('home');
  readonly actions = input<M3CardAction[] | undefined>(undefined);
}
