import { ChangeDetectionStrategy, Component, inject, signal, viewChild, ElementRef } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline',
      },
    },
  ],
  imports: [
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
  readonly userService = inject(UserService);
  readonly themeService = inject(ThemeService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly fileInput = viewChild<ElementRef<HTMLInputElement>>('fileInput');

  readonly dragOver = signal(false);
  readonly uploading = signal(false);

  readonly userSettingsFormGroup = new FormGroup({
    firstName: new FormControl<string>(this.userService.loggedOnUser()?.name ?? '', [Validators.required]),
    secondName: new FormControl<string>(this.userService.loggedOnUser()?.surname ?? '', [Validators.required]),
    username: new FormControl<string>(this.userService.loggedOnUser()?.username ?? '', [Validators.required]),
    email: new FormControl<string>(this.userService.loggedOnUser()?.email ?? '', [Validators.email]),
  });

  constructor() {
    this.themeService.watermarks['/settings/personal'] = 'contacts_product';
  }

  async save(): Promise<void> {
    return;
  }

  changeUserAvatar(): void {
    this.fileInput()?.nativeElement.click();
  }

  onDragOver(evt: DragEvent): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.dragOver.set(true);
  }

  onDragLeave(evt: DragEvent): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.dragOver.set(false);
  }

  onDrop(evt: DragEvent): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.dragOver.set(false);
    if (!evt.dataTransfer || evt.dataTransfer.files.length === 0) return;
    const file = evt.dataTransfer.files[0];
    this.handleFile(file);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    this.handleFile(file);
    input.value = '';
  }

  private async handleFile(file: File): Promise<void> {
    const user = this.userService.loggedOnUser();
    if (!user) {
      this.snackBar.open('Not logged in', 'Close', { duration: 2500 });
      return;
    }
    if (!file.type.startsWith('image/')) {
      this.snackBar.open('Please select an image file', 'Close', { duration: 2500 });
      return;
    }
    const maxSize = 50 * 1024 * 1024;
    if (file.size > maxSize) {
      this.snackBar.open('Image too large (max 50MB)', 'Close', { duration: 3000 });
      return;
    }
    this.uploading.set(true);
    try {
      await this.userService.UploadAvatar(user.id, file);
      const avatar = await this.userService.GetUserAvatar(user.id);
      this.userService.currentUserAvatarUrl.set(avatar ? `data:image/*;base64,${avatar}` : null);
      this.snackBar.open('Avatar updated', 'Close', { duration: 2000 });
    } catch (e) {
      console.error(e);
      this.snackBar.open('Failed to upload avatar', 'Close', { duration: 3000 });
    } finally {
      this.uploading.set(false);
    }
  }
}
