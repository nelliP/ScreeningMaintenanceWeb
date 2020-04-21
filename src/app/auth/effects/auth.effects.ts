import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { startWith, switchMap } from 'rxjs/operators';

import { AuthService } from './../services/auth.service'
import { AuthActionTypes, LoadingUser, UserFound, UserExpired } from './../actions/auth.actions';


@Injectable()
export class AuthEffects {
  constructor(private actions: Actions, private authenticationService: AuthService) { }

  @Effect()
  loadUser: Observable<Action> = this.actions
    .pipe(
      ofType<LoadingUser>(AuthActionTypes.LoadingUser),
      startWith(new LoadingUser()),
      switchMap(() => this.authenticationService.getUser()
        .then((user) => {
          if (user) {
            return new UserFound(user);
          }
          else {
            return new UserExpired();
          }
        })
        .catch((err) => {
          return new UserExpired();
        })
    ));
}