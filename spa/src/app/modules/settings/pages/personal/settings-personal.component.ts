import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}


}
