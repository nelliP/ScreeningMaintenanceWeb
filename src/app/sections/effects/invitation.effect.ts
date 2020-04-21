import {Injectable} from '@angular/core';
import {Effect, Actions, ofType} from '@ngrx/effects';
//rxjs
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { switchMap, map, catchError } from 'rxjs/operators';
//Store
import { Store, Action } from '@ngrx/store';
import * as invitationsActions from '../actions/invitation.actions';
import * as exceptionActions from '../actions/exception.actions';
import * as fromServices from '../services/invitation.service';

@Injectable()
export class InvitationEffects{
    constructor(private actions$: Actions,
                private invitationsService: fromServices.InvitationService) { }

    @Effect()
    updateClinic: Observable<Action> = this. actions$
    .pipe(
        ofType(invitationsActions.InvitationsActionTypes.UPDATE),
        switchMap((action: invitationsActions.UpdateInvitation) => this.invitationsService.updateInvitation(action.payload)
    .pipe(
        map(result => new invitationsActions.UpdateInvitationSuccess(result)),
        catchError(error => [
            new invitationsActions.UpdateInvitationFail(error),
            new exceptionActions.Save(error)
        ]))
    ));
}