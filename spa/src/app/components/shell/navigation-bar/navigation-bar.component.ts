import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { UserService } from '../../../services/user.service';

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
