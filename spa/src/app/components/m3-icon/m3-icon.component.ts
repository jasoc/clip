import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'm3-icon',
  templateUrl: './m3-icon.component.html',
  styleUrls: ['./m3-icon.component.scss'],
  imports: [MatIconModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class M3IconComponent {
  readonly style = input<'rounded' | 'sharp' | 'outlined'>('rounded');
  readonly filled = input(false);
  readonly weight = input(400);
  readonly fontSize = input('24px', { alias: 'font-size' });
}
