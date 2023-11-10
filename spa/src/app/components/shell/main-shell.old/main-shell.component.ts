import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { M3ChipComponent } from '../../m3-chip/m3-chip.component';
import { M3InputComponent } from '../../m3-input/m3-input.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { UserService } from 'src/app/services/user.service';
import { NavigationDrawerComponent } from '../navigation-drawer/navigation-drawer.component';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-main-shell',
  templateUrl: './main-shell.component.html',
  styleUrls: ['./main-shell.component.scss'],
  imports: [CommonModule, M3ChipComponent, NavigationDrawerComponent, NavigationBarComponent, M3InputComponent, MatChipsModule, SearchBarComponent, RouterOutlet]
})
export class MainShellComponent {
  public Paths: string[] = [ "home", "about" ];

  constructor(private userService: UserService) { }

}
