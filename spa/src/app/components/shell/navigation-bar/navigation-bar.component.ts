import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';

import { UserService } from '../../../services/user.service';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  standalone: true,
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
  imports: [CommonModule, MatChipsModule, SearchBarComponent],
})
export class NavigationBarComponent {
  public Paths: string[] = ['home', 'about'];

  constructor(private userService: UserService) {}
}
