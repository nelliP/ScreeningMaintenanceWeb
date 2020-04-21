import { Action } from '@ngrx/store';

import { User } from 'oidc-client';

export enum AuthActionTypes {
  LoadingUser = '[Auth] Loading User',
  UserFound = '[Auth] User Found',
  UserExpired = '[Auth] User Expired',
  UserExpiring = '[Auth] User Expiring',
  UserSignedOut = '[Auth] User Signed Out',
  SessionTerminated = '[Auth] Session Terminated',
  RedirectSuccess = '[Auth] Redirect Success',
  SilentRenewError = '[Auth] Silent Renew Error',
};


export class LoadingUser implements Action {
  readonly type = AuthActionTypes.LoadingUser;

  constructor() { }
}

export class UserFound implements Action {
  readonly type = AuthActionTypes.UserFound;

  constructor(public payload: User) { }
}

export class UserExpired implements Action {
  readonly type = AuthActionTypes.UserExpired;

  constructor() { }
}

export class UserExpiring implements Action {
  readonly type = AuthActionTypes.UserExpiring;

  constructor() { }
}

export class UserSignedOut implements Action {
  readonly type = AuthActionTypes.UserSignedOut;

  constructor() { }
}

export class SessionTerminated implements Action {
  readonly type = AuthActionTypes.SessionTerminated;

  constructor() { }
}

export class RedirectSuccess implements Action {
  readonly type = AuthActionTypes.RedirectSuccess;

  constructor(public payload: User) { }
}

export class SilentRenewError implements Action {
  readonly type = AuthActionTypes.SilentRenewError;

  constructor(public payload: String) { }
}

export type AuthActions =
  | LoadingUser
  | UserFound
  | UserExpired
  | UserExpiring
  | UserSignedOut
  | SessionTerminated
  | RedirectSuccess
  | SilentRenewError;