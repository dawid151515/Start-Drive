import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { RegisterLoginService } from '../service/register-login-service/register-login.service';

@Injectable({
  providedIn: 'root'
})
class AuthGuard {

  constructor(private registerLoginService: RegisterLoginService, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
    if(this.registerLoginService.isLoggedIn()){
      return true
    }else{
      this.router.navigate(['startDrive/logowanie'])
      return false
    }

  }
}

export const isAuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean => {
  return inject(AuthGuard).canActivate(route, state);
}
