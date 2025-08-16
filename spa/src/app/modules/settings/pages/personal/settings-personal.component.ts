import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'clip-settings-personal',
  standalone: true,
  templateUrl: './settings-personal.component.html',
  styleUrls: ['./settings-personal.component.scss'],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatSnackBarModule, FormsModule],
})
export class SettingsPersonalComponent {
  public userService = inject(UserService);
  constructor(private snackBar: MatSnackBar) {}

  public changeUserAvatar(): void {
    // Logic to change user avatar
    this.snackBar.open('Change user avatar clicked', 'Close', {
      duration: 2000,
    });
  }
}
