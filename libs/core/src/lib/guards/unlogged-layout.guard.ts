import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot,
} from '@angular/router';
import { UserService } from '../services/user.service';

export const UnloggedLayoutGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const _router = inject(Router);
  const _userService = inject(UserService);
  if (_userService.isLoggedIn) {
    _router.navigate(['logged'])
    return false;
  }
  return true;
};
