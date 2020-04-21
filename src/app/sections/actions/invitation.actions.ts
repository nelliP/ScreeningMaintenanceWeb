import { Action } from '@ngrx/store';
import { Invitation } from '../models/invitation.model'

export enum InvitationsActionTypes {
  UPDATE = '[Sections] Update Invitation',
  UPDATE_SUCCESS = '[Sections] Update Invitation Success',
  UPDATE_FAIL = '[Sections] Update Invitation Fail'
};

//UPDATE ActionCreators
export class UpdateInvitation implements Action {
    readonly type = InvitationsActionTypes.UPDATE;
    constructor(public payload: Invitation) { }
}
export class UpdateInvitationSuccess implements Action {
    readonly type = InvitationsActionTypes.UPDATE_SUCCESS;
    constructor(public payload: Invitation) { }
}
export class UpdateInvitationFail implements Action {
    readonly type = InvitationsActionTypes.UPDATE_FAIL;
    constructor(public payload: any) { }
}

export type InvitationsActions
  = UpdateInvitation
  | UpdateInvitationSuccess
  | UpdateInvitationFail