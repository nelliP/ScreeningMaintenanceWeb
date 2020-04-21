import { Observable } from 'rxjs/Observable';
import { map, switchMap, take, filter } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import * as fromUsers from '../reducers';
import * as userActions from './../actions/users.actions';
import {User} from "./../models/user.model";


@Injectable()
export class EditUserGuard implements CanActivate {
  constructor(
    private store: Store<fromUsers.UsersState>,
    private router: Router
  ) { }
    
  waitForUserToLoad(): Observable<boolean> {
    return this.store.pipe(
      select(fromUsers.getLoading),
      filter(loading => !loading),
      take(1)
    );
  }
    
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    this.store.dispatch(new userActions.Select(route.params['id']));

    return this.waitForUserToLoad()
      .pipe(
        switchMap(() => this.store.pipe(select(fromUsers.getSelectedUser))),
        take(1),
        map(user => {
          if(!user) {
            this.router.navigateByUrl('/404');
          }

          return !!user;
      }));
  }
}