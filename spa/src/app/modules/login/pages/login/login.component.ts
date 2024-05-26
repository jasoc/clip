import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Theme, ThemeService } from '../../../../services/theme.service';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatBackgroundComponent } from '../../../../components/float-background/float-background.component';
import { CommonModule } from '@angular/common';
import {
  MatSnackBar,
} from '@angular/material/snack-bar';

@Component({
  standalone: true,
    selector: 'clip-login',
    providers: [ThemeService],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [
      CommonModule,
      MatButtonModule,
      MatIconModule,
      FloatBackgroundComponent,
      MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatCardModule, FormsModule,MatIcon]
})

export class LoginComponent {

  loginFormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  public Theme = Theme;

  constructor(
    private userService: UserService,
    public themeService: ThemeService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  async login() {
    await this.userService.LoginUser(
      this.loginFormGroup.controls.username.value!,
      this.loginFormGroup.controls.password.value!
    ).then((res) => {
      if (res) {
        this.router.navigate(['/home']);
      }
    })
    .catch((err) => {
      this._snackBar.open(err.error.message, 'Dismiss');
    });
  }

  async goToRegister() {
    this.router.navigate(['/register'])
  }
}
