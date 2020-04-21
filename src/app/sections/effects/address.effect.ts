import {Injectable} from '@angular/core';
import {Effect, Actions, ofType} from '@ngrx/effects';
//rxjs
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { switchMap, map, catchError } from 'rxjs/operators';
//Store
import { Store, Action } from '@ngrx/store';
import * as addressesActions from '../actions/address.actions';
import * as exceptionActions from '../actions/exception.actions';
import * as fromReducer from '../reducers';
import * as fromServices from '../services/address.service';

@Injectable()
export class AddressEffects{
    constructor(private actions$: Actions,
                private addressesService: fromServices.AddressService,
                private store: Store<fromReducer.MaintenanceState>
            ) {}

    @Effect()
    updateAddress: Observable<Action> = this. actions$
    .pipe(
        ofType(addressesActions.AddressesActionTypes.UPDATE),
        switchMap((action: addressesActions.UpdateAddress) => this.addressesService.updateAddress(action.payload)
          .pipe(
            map(result => new addressesActions.UpdateAddressSuccess(result)),
            catchError(error => [
                new addressesActions.UpdateAddressFail(error),
                new exceptionActions.Save(error)
            ]))
    ));
}