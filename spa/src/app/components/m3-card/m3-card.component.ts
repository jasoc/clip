import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'm3-card',
  templateUrl: './m3-card.component.html',
  styleUrls: ['./m3-card.component.scss'],
  imports: [CommonModule, MatRippleModule, MatButtonModule, MatIconModule, RouterModule],
  standalone: true,
})
export class M3CardComponent {
  @Input()
  public title: string = 'Title';

  @Input()
  public link?: string;

  @Input()
  public subTitle: string = 'Sub title';

  @Input()
  public titleIcon: string = 'home';

  @Input()
  public actions: M3CardAction[] | undefined = undefined;
}

export type M3CardAction = {
  icon: string;
  color?: 'primary' | 'accent' | 'warn';
  label: string;
  callback: () => void;
};
