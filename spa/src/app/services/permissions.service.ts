import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

import { UserService } from './user.service';

export class PermissionsService {
  static isUserLoggedFn(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const userService = inject(UserService);
    const routerService = inject(Router);

    if (!userService.userLogged()) {
      routerService.navigateByUrl('/login');
      return false;
    }

    return true;
  }
}
