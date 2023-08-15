import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatChipsModule} from '@angular/material/chips';
import { M3ChipComponent } from '../../m3-chip/m3-chip.component';
import { M3InputComponent } from '../../m3-input/m3-input.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  standalone: true,
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
  imports: [CommonModule, M3ChipComponent, M3InputComponent, MatChipsModule, SearchBarComponent],
})
export class NavigationBarComponent {
  public Paths: string[] = [ "home", "about" ];
}
