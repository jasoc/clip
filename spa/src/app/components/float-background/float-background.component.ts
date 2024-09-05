import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'float-background',
  standalone: true,
  templateUrl: './float-background.component.html',
  styleUrls: ['./float-background.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class FloatBackgroundComponent {
  public emojis: Array<string> = [
    '😀',
    '🍕',
    '😃',
    '🤡',
    '😅',
    '👽',
    '😇',
    '😈',
    '😉',
    '🍉',
    '😋',
    '😌',
    '😍',
    '🤬',
    '😏',
    '🤾',
    '🥝',
    '😒',
    '🥕',
    '🌮',
    '🎃',
    '🔥',
  ];
}
