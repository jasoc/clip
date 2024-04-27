import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { UserService } from "./user.service";

export class PermissionsService {

    static CanActivateFn(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      let userService = inject(UserService);
      let routerService = inject(Router);

      if (!userService.userLogged()) {
        routerService.navigateByUrl('/login');
        return false;
      }

      return true;
    }
}
