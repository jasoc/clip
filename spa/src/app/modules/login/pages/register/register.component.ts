import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Theme, ThemeService } from '../../../../services/theme.service';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { FloatBackgroundComponent } from '../../../../components/float-background/float-background.component';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  standalone: true,
  selector: 'clip-register',
  providers: [ThemeService, { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }],
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FloatBackgroundComponent,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    FormsModule,
    MatIcon,
  ],
})
export class RegisterComponent {
  registerFormGroup = new FormGroup(
    {
      firstName: new FormControl<string>('', [Validators.required]),
      secondName: new FormControl<string>('', [Validators.required]),
      username: new FormControl<string>('', [Validators.required]),
      email: new FormControl<string>('', [Validators.email]),
      password2: new FormControl<string>('', [Validators.required]),
      password: new FormControl<string>('', [
        Validators.required,
        // TODO: workaround, for some reasons min() or minLength() just color
        // the input component and doesen't emit the minLength error???
        // (control) => control.value.length == 0 || control.value.length > 8 ? null : { minLength: true }
      ]),
    },
    this.passwordValidator
  );

  constructor(
    private userService: UserService,
    private router: Router,
    public themeService: ThemeService,
    private snackBar: MatSnackBar
  ) {}

  public Theme = Theme;

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.value.password;
    const password2 = control.value.password2;
    if (!password || !password2) return null;
    return password == password2 ? null : { passwordEquals: true };
  }

  async register() {
    await this.userService
      .RegisterUser({
        username: this.registerFormGroup.controls.username.value!,
        password: this.registerFormGroup.controls.password.value!,
        email: this.registerFormGroup.controls.email.value!,
        name: this.registerFormGroup.controls.firstName.value!,
        surname: this.registerFormGroup.controls.secondName.value!,
      })
      .then(res => {
        if (res) {
          this.router.navigate(['/home']);
        }
      })
      .catch(err => {
        this.snackBar.open(err.error.message, 'Dismiss');
      });
  }

  async goToLogin(event: Event) {
    event.stopPropagation();
    this.router.navigate(['/login']);
  }
}
