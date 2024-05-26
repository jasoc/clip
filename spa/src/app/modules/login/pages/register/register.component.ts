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
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  standalone: true,
    selector: 'clip-register',
    providers: [ThemeService],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    imports: [
      CommonModule,
      MatButtonModule,
      MatIconModule,
      FloatBackgroundComponent,
      MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatCardModule, FormsModule,MatIcon]
})
export class RegisterComponent {

  registerFormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    secondName: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email]),
    password: new FormControl('', [Validators.required]),
    password2: new FormControl('', [Validators.required]),
  })

  constructor(
    private userService: UserService,
    private router: Router,
    public themeService: ThemeService,
    private _snackBar: MatSnackBar
    ) { }
  
  public Theme = Theme;

  async register() {
    console.log("flkdnhfg kjdyhli")
    await this.userService.RegisterUser({
        username: this.registerFormGroup.controls.username.value!,
        password: this.registerFormGroup.controls.password.value!,
        email: this.registerFormGroup.controls.email.value!,
        name: this.registerFormGroup.controls.firstName.value!,
        surname: this.registerFormGroup.controls.secondName.value!,
    })
    .then((res) => {
      if (res) {
        this.router.navigate(['/home'])
      }
    })
    .catch((err) => {
      this._snackBar.open(err.error.message, 'Dismiss');
    });
  }

  async goToLogin() {
    this.router.navigate(['/login'])
  }
}
