import {Injectable} from '@angular/core';
import {Effect, Actions, ofType} from '@ngrx/effects';
//rxjs
import { Observable } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
//Store
import { Action } from '@ngrx/store';
import * as maintenanceActions from '../actions/maintenance.actions';
import * as exceptionActions from '../actions/exception.actions';
import * as fromServices from '../services';

@Injectable()
export class MaintenanceEffects{
    constructor(private actions$: Actions,
                private maintenanceService: fromServices.MaintenanceService
            ) {}

    @Effect()
    createMaintenance: Observable<Action> = this. actions$
    .pipe(
        ofType(maintenanceActions.MaintenanceActionTypes.CREATE),
        switchMap((action: maintenanceActions.CreateMaintenance) => 
                this.maintenanceService.createMaintenance(action.payload1, action.payload2)
          .pipe(
            map(result => new maintenanceActions.CreateMaintenanceSuccess(result)),
            catchError(error => [
                new maintenanceActions.CreateMaintenanceFail(error),
                new exceptionActions.Save(error)
        ]))
    ));

    @Effect()
    updateNewMaintenance: Observable<Action> = this. actions$
    .pipe(
        ofType(maintenanceActions.MaintenanceActionTypes.UPDATE_NEW),
        switchMap((action: maintenanceActions.UpdateNewMaintenance) => 
                this.maintenanceService.updateNewMaintenance(action.payload)
          .pipe(
            map(result => new maintenanceActions.UpdateNewMaintenanceSuccess(result)),
            catchError(error => [
                new maintenanceActions.UpdateNewMaintenanceFail(error),
                new exceptionActions.Save(error)
        ]))
    ));
}