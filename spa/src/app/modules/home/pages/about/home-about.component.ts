import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'clip-home-about',
  standalone: true,
  templateUrl: './home-about.component.html',
  styleUrls: ['./home-about.component.scss'],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatSnackBarModule, HttpClientModule, FormsModule],
})
export class HomeAboutComponent {
  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  async uploadRandomAvatar() {
    try {
      const who = await this.userService.WhoAmI();
      const userId = (who as any).user.id as string;
      const resp = await fetch('https://picsum.photos/seed/' + Math.random() + '/256');
      const blob = await resp.blob();
      const file = new File([blob], 'avatar.jpg', { type: blob.type || 'image/jpeg' });
      await this.userService.UploadAvatar(userId, file);
      this.snackBar.open('Profile picture updated', 'Close', { duration: 2000 });
    } catch (e) {
      console.error(e);
      this.snackBar.open('Failed to update profile picture', 'Close', { duration: 3000 });
    }
  }
}
