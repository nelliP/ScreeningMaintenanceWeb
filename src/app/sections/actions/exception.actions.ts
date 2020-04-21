import { Action } from '@ngrx/store';
import { Address } from '../models/address.model'

export enum ExceptionActionTypes {
    SAVE = '[Exception] SAVE',
    CLEAR = '[Exception] CLEAR'
  };
  
  export class Save implements Action {
    readonly type = ExceptionActionTypes.SAVE;
    constructor(public payload: any) { }
  }
  export class Clear implements Action {
    readonly type = ExceptionActionTypes.CLEAR;
    constructor() { }
  }
  
  export type Actions
    = Save
    | Clear