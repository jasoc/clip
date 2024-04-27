import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { M3InputComponent } from "../../../../components/m3-input/m3-input.component";
import { M3ButtonComponent } from "../../../../components/m3-button/m3-button.component";

@Component({
    selector: 'clip-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [M3InputComponent, M3ButtonComponent]
})
export class LoginComponent {

  constructor(
    private userService: UserService,
    private router: Router,
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
