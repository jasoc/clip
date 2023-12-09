import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'm3-icon',
  templateUrl: './m3-icon.component.html',
  styleUrls: ['./m3-icon.component.scss'],
  imports: [CommonModule],
  standalone: true
})
export class M3IconComponent {

  @Input()
  public style: "rounded" | "sharp" | "outlined" = 'rounded';

  @Input()
  public filled: boolean = false;

  @Input()
  public weight: number = 400;

  @Input("font-size")
  public fontSize: string = "24px";
}
