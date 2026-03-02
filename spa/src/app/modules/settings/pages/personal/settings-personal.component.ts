import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { ThemeService } from '../../../../services/theme.service';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'clip-settings-personal',
  standalone: true,
  templateUrl: './settings-personal.component.html',
  styleUrls: ['./settings-personal.component.scss'],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline',
      },
    },
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSnackBarModule,
    FormsModule,
  ],
})
export class SettingsPersonalComponent {
  public userService = inject(UserService);
  public themeService: ThemeService = inject(ThemeService);

  userSettingsFormGroup = new FormGroup({
    firstName: new FormControl<string>(this.userService.loggedOnUser?.name ?? '', [Validators.required]),
    secondName: new FormControl<string>(this.userService.loggedOnUser?.surname ?? '', [Validators.required]),
    username: new FormControl<string>(this.userService.loggedOnUser?.username ?? '', [Validators.required]),
    email: new FormControl<string>(this.userService.loggedOnUser?.email ?? '', [Validators.email]),
  });

  constructor(private snackBar: MatSnackBar) {
    this.themeService.watermarks['/settings/personal'] = 'contacts_product';
  }
  @ViewChild('fileInput') private fileInput!: ElementRef<HTMLInputElement>;

  public dragOver = false;
  public uploading = false;

  public async save(): Promise<void> {
    return;
  }

  public changeUserAvatar(): void {
    // Open hidden file input dialog
    this.fileInput?.nativeElement.click();
  }

  public onDragOver(evt: DragEvent): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.dragOver = true;
  }

  public onDragLeave(evt: DragEvent): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.dragOver = false;
  }

  public onDrop(evt: DragEvent): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.dragOver = false;
    if (!evt.dataTransfer || evt.dataTransfer.files.length === 0) return;
    const file = evt.dataTransfer.files[0];
    this.handleFile(file);
  }

  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    this.handleFile(file);
    // reset so same file can be selected again later
    input.value = '';
  }

  private async handleFile(file: File): Promise<void> {
    if (!this.userService.loggedOnUser) {
      this.snackBar.open('Not logged in', 'Close', { duration: 2500 });
      return;
    }
    if (!file.type.startsWith('image/')) {
      this.snackBar.open('Please select an image file', 'Close', { duration: 2500 });
      return;
    }
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      this.snackBar.open('Image too large (max 50MB)', 'Close', { duration: 3000 });
      return;
    }
    this.uploading = true;
    try {
      await this.userService.UploadAvatar(this.userService.loggedOnUser.id, file);
      const avatar = await this.userService.GetUserAvatar(this.userService.loggedOnUser.id);
      this.userService.currentUserAvatarUrl = avatar ? `data:image/*;base64,${avatar}` : null;

      this.snackBar.open('Avatar updated', 'Close', { duration: 2000 });
    } catch (e) {
      console.error(e);
      this.snackBar.open('Failed to upload avatar', 'Close', { duration: 3000 });
    } finally {
      this.uploading = false;
    }
  }
}
