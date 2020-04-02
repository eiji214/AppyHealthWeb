import { Inject, Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { AuthService } from './auth.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(public authService: AuthService, @Inject(DOCUMENT) private document: any) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //this.authService
    //if (!this.authService.isLoggedIn()) {
    //  this.router.navigate(['/']);
    //  return false;
    //}
    //return true;

    let result = await this.authService.isLoggedIn();

    if (!result) {
      this.document.location.href = `/Session/SignIn?redirectUrl=/app${state.url}`;
      return false;
    }

    return true;
    
  }
}
