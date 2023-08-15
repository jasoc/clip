import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'm3-chip',
  templateUrl: './m3-chip.component.html',
  styleUrls: ['./m3-chip.component.scss'],
  imports: [CommonModule],
})
export class M3ChipComponent {

  @Input()
  public BackgroundColor: string = 'black';

  @Input()
  public TextColor: string = 'white';
}
