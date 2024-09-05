import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ContentChildren, QueryList } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { M3IconComponent } from '../m3-icon/m3-icon.component';
import { M3TabComponent } from './m3-tab/m3-tab.component';

@Component({
  selector: 'm3-tabs',
  standalone: true,
  templateUrl: './m3-tabs.component.html',
  styleUrls: ['./m3-tabs.component.scss'],
  imports: [CommonModule, M3IconComponent, M3TabComponent, MatIconModule],
})
export class M3TabsComponent implements AfterViewInit {
  @ContentChildren(M3TabComponent)
  tabsComponents?: QueryList<M3TabComponent>;

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.tabsComponents && this.tabsComponents.length > 0) {
        this.tabsComponents.forEach((tab) => {
          tab.show = false;
        });
        this.tabsComponents.get(0)!.show = true;
      }
    });
  }

  showTab(tab: M3TabComponent) {
    if (this.tabsComponents && this.tabsComponents.length > 0) {
      this.tabsComponents.forEach((tab) => {
        tab.show = false;
      });
    }
    tab.show = true;
  }
}
