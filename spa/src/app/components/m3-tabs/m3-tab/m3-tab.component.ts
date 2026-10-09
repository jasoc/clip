import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';

@Component({
  selector: 'm3-tab',
  templateUrl: './m3-tab.component.html',
  styleUrls: ['./m3-tab.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class M3TabComponent {
  readonly show = model(false);
  readonly icon = input('home');
  readonly label = input('Page');
}
