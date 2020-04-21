import {Injectable} from '@angular/core';
import {Effect, Actions, ofType} from '@ngrx/effects';
//rxjs
import { Observable } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
//Store
import { Store, select, Action } from "@ngrx/store";
import * as maintenanceListsActions from '../actions/maintenance-lists.actions';
import * as exceptionActions from '../actions/exception.actions';
import * as fromServices from '../services/maintenance-lists.service';

@Injectable()
export class MaintenanceListsEffects{
    constructor(private actions$: Actions,
                private maintenanceListsService: fromServices.MaintenanceListsService
            ) {}
            
    @Effect()
    loadClinics: Observable<Action> = this. actions$
    .pipe(
        ofType(maintenanceListsActions.MaintenanceListsActionTypes.LOAD),
        switchMap(() => this.maintenanceListsService.getmaintenanceLists()
        .pipe(
            map(result => new maintenanceListsActions.LoadMaintenanceListsSuccess(result)),
            catchError(error => [
                new maintenanceListsActions.LoadMaintenanceListsFail(error),
                new exceptionActions.Save(error)
        ]))
    ));
}