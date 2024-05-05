import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { ThemeService } from '../../../../services/theme.service';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatBackgroundComponent } from '../../../../components/float-background/float-background.component';

@Component({
  standalone: true,
    selector: 'clip-login',
    providers: [ThemeService],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [
      MatButtonModule,
      MatIconModule,
      FloatBackgroundComponent,
      MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatCardModule, FormsModule,MatIcon]
})
export class LoginComponent {
  emailFormControl = new FormControl('', [Validators.required]);

  constructor(
    private userService: UserService,
    private router: Router,
    public themeService: ThemeService
    ) { }

  Username: string = "";
  Password: string = "";
  UsernameMessage: string = "";

  async Login() {
    await this.userService.LoginUser(this.Username, this.Password)
      .then((res) => {
        if (res) {
          this.router.navigate(['/home'])
        }
      })
      .catch((err) => this.UsernameMessage = err.message);
  }
}
