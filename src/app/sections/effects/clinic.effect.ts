import {Injectable} from '@angular/core';
import {Effect, Actions, ofType} from '@ngrx/effects';
//rxjs
import { Observable } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
//Store
import { Store, select, Action } from "@ngrx/store";
import * as clinicsActions from '../actions/clinic.actions';
import * as exceptionActions from '../actions/exception.actions';
import * as fromServices from '../services/clinic.service';

@Injectable()
export class ClinicEffects{
    constructor(private actions$: Actions,
                private clinicsService: fromServices.ClinicService) { }
            
    @Effect()
    updateClinic: Observable<Action> = this. actions$
    .pipe(
        ofType(clinicsActions.ClinicsActionTypes.UPDATE),
        switchMap((action: clinicsActions.UpdateClinic) => this.clinicsService.updateClinic(action.payload)
          .pipe(
            map(result => new clinicsActions.UpdateClinicSuccess(result)),
            catchError(error => [
                new clinicsActions.UpdateClinicFail(error),
                new exceptionActions.Save(error)
        ]))
    ));
}