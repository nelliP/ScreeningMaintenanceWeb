import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, tap, catchError } from 'rxjs/operators';

import { UsersService } from './../services/users.service'
import { UsersActionTypes, Load, LoadSuccess, LoadFail, Save, SaveSuccess, SaveFail, Select, SelectSuccess, SelectFail } from './../actions/users.actions';


@Injectable()
export class UsersEffects {
  constructor(private actions: Actions, private router: Router, private usersService: UsersService) { }

  @Effect()
  loadUsers: Observable<Action> = this.actions
    .pipe(
      ofType<Load>(UsersActionTypes.Load),
      switchMap(() => this.usersService.getUsers().pipe(
        map(result => new LoadSuccess(result)),
        catchError(error => of(new LoadFail(error))))
    ));

  @Effect()
  saveUser: Observable<Action> = this.actions
    .pipe(
      ofType<Save>(UsersActionTypes.Save),
      map((action: Save) => action.payload),
      switchMap(user => this.usersService.saveUser(user).pipe(
        map(result => new SaveSuccess()),
        catchError(error => of(new SaveFail())))
    ));

  @Effect()
  selectUser: Observable<Action> = this.actions
    .pipe(
      ofType<Select>(UsersActionTypes.Select),
      map((action: Select) => action.payload),
      switchMap(id => this.usersService.getUser(id).pipe(
        map(result => new SelectSuccess(result)),
        catchError(error => of(new SelectFail())))
    ));

  @Effect({ dispatch: false })
  savedUser: Observable<Action> = this.actions
    .pipe(
      ofType<SaveSuccess>(UsersActionTypes.SaveSuccess),
      tap(() => this.router.navigate(['/users']))
    );
}