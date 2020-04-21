import { Injectable } from '@angular/core';
import { Route, Router, RouterStateSnapshot, CanActivate, CanActivateChild, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { take, map } from 'rxjs/operators';

import { AuthService } from './../services/auth.service';


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  private isUserLoggedIn(): Observable<boolean> {
    return this.authService.getUserFromStore().pipe(
      take(1),
      map(user => {
        if(!user) {
          this.router.navigateByUrl('/auth/login');
        }

        return !!user;
      }));
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.isUserLoggedIn();
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.isUserLoggedIn();
  }

  canLoad(route: Route): Observable<boolean> {
    return this.isUserLoggedIn();
  }
}