import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'm3-tab',
  templateUrl: './m3-tab.component.html',
  styleUrls: ['./m3-tab.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class M3TabComponent {
  @Input()
  public show: boolean = false;

  @Input()
  public icon: string = 'home';

  @Input()
  public label: string = 'Page';
}
