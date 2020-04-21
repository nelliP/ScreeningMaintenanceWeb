import { Action } from '@ngrx/store';

import {User} from "./../models/user.model";

export enum UsersActionTypes {
  Load = '[Users] Load',
  LoadSuccess = '[Users] Load Success',
  LoadFail = '[Users] Load Fail',
  Save = '[Users] Save',
  SaveSuccess = '[Users] Save Success',
  SaveFail = '[Users] Save Fail',
  Select = '[Users] Select',
  SelectSuccess = '[Users] Select Success',
  SelectFail = '[Users] Select Fail',
  New = '[Users] New'
};


export class Load implements Action {
  readonly type = UsersActionTypes.Load;

  constructor() { }
}

export class LoadSuccess implements Action {
  readonly type = UsersActionTypes.LoadSuccess;

  constructor(public payload: User[]) { }
}

export class LoadFail implements Action {
  readonly type = UsersActionTypes.LoadFail;

  constructor(public payload: any) { }
}

export class Save implements Action {
  readonly type = UsersActionTypes.Save;

  constructor(public payload: User) { }
}

export class SaveSuccess implements Action {
  readonly type = UsersActionTypes.SaveSuccess;

  constructor() { }
}

export class SaveFail implements Action {
  readonly type = UsersActionTypes.SaveFail;

  constructor() { }
}

export class Select implements Action {
  readonly type = UsersActionTypes.Select;

  constructor(public payload: number) { }
}

export class SelectSuccess implements Action {
  readonly type = UsersActionTypes.SelectSuccess;

  constructor(public payload: User) { }
}

export class SelectFail implements Action {
  readonly type = UsersActionTypes.SelectFail;

  constructor() { }
}

export class New implements Action {
  readonly type = UsersActionTypes.New;

  constructor() { }
}

export type UsersActions =
  | Load
  | LoadSuccess
  | LoadFail
  | Save
  | SaveSuccess
  | SaveFail
  | Select
  | SelectSuccess
  | SelectFail
  | New;