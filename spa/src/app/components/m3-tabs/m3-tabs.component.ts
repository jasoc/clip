import { afterNextRender, ChangeDetectionStrategy, Component, contentChildren } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { M3IconComponent } from '../m3-icon/m3-icon.component';
import { M3TabComponent } from './m3-tab/m3-tab.component';

@Component({
  selector: 'm3-tabs',
  standalone: true,
  templateUrl: './m3-tabs.component.html',
  styleUrls: ['./m3-tabs.component.scss'],
  imports: [M3IconComponent, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class M3TabsComponent {
  readonly tabs = contentChildren(M3TabComponent);

  constructor() {
    afterNextRender(() => {
      const tabs = this.tabs();
      if (tabs.length > 0) {
        tabs.forEach((tab) => tab.show.set(false));
        tabs[0].show.set(true);
      }
    });
  }

  showTab(tab: M3TabComponent) {
    const tabs = this.tabs();
    tabs.forEach((t) => t.show.set(false));
    tab.show.set(true);
  }
}
