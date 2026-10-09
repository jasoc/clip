import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'float-background',
  standalone: true,
  templateUrl: './float-background.component.html',
  styleUrls: ['./float-background.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FloatBackgroundComponent {
  readonly emojis: ReadonlyArray<string> = [
    '😀', '🍕', '😃', '🤡', '😅', '👽', '😇', '😈', '😉', '🍉',
    '😋', '😌', '😍', '🤬', '😏', '🤾', '🥝', '😒', '🥕', '🌮',
    '🎃', '🔥',
  ];
}
