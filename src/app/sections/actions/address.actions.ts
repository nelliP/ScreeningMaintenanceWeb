import { Action } from '@ngrx/store';
import { Address } from '../models/address.model'

export enum AddressesActionTypes {  
  UPDATE = '[Sections] Update Address',
  UPDATE_SUCCESS = '[Sections] Update Address Success',
  UPDATE_FAIL = '[Sections] Update Address Fail'
};

//UPDATE ActionCreators
export class UpdateAddress implements Action {
    readonly type = AddressesActionTypes.UPDATE;
    constructor(public payload: Address) { }
}
export class UpdateAddressSuccess implements Action {
    readonly type = AddressesActionTypes.UPDATE_SUCCESS;
    constructor(public payload: Address) { }
}
export class UpdateAddressFail implements Action {
    readonly type = AddressesActionTypes.UPDATE_FAIL;
    constructor(public payload: any) { }
}

export type AddressesActions
  = UpdateAddress
  | UpdateAddressSuccess
  | UpdateAddressFail