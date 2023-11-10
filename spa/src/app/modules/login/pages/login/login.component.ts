import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'clip-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
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
