import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  readonly userService = inject(UserService);

  ngOnInit() {
    if (this.userService.userLogged()) {
      this.userService.init();
    }
  }
}
