import * as fromActions from '../actions';
import { Invitation } from "../models/invitation.model";

export interface InvitationState {
    invitation: Invitation;
    invitationToUpdate: Invitation;
    updated: boolean;
    updating: boolean;
    invitationToCreate: Invitation;
  };
  
const initialState: InvitationState = {
    invitation: null,
    invitationToUpdate: null,
    updated: false,
    updating: false,
    invitationToCreate: null
};

export function reducer(
    state = initialState, 
    action: fromActions.InvitationsActions): InvitationState{
        switch (action.type) {
        //UPDATE
            case fromActions.InvitationsActionTypes.UPDATE: {
                const invitation: Invitation = action.payload;
                return {
                    ...state,
                    updating: true,
                    invitationToUpdate: invitation
                };
            }
            case fromActions.InvitationsActionTypes.UPDATE_SUCCESS: {
                const invitation = action.payload;
                return {
                    ...state,
                    updating: false,
                    updated: true,
                    invitationToUpdate: null,
                    invitation
                };
            }
            case fromActions.InvitationsActionTypes.UPDATE_FAIL: {
                return {
                    ...state,
                    updating: false,
                    updated: false,
                    invitationToUpdate: null
                };
            }            
            default: {
              return state;
        }
    }
}

export const getInvitationUpdated = (state: InvitationState) => state.invitation;
export const getInvitationsUpdatedSuccess = (state: InvitationState) => state.updated;
export const getInvitationsUpdating = (state: InvitationState) => state.updating;
export const getInvitationToUpdate = (state: InvitationState) => state.invitationToUpdate;