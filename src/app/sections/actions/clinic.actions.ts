import { Action } from '@ngrx/store';
import { Clinic } from '../models/clinic.model'

export enum ClinicsActionTypes {
  UPDATE = '[Sections] Update Clinic',
  UPDATE_SUCCESS = '[Sections] Update Clinic Success',
  UPDATE_FAIL = '[Sections] Update Clinic Fail',
};

//UPDATE ActionCreators
export class UpdateClinic implements Action {
    readonly type = ClinicsActionTypes.UPDATE;
    constructor(public payload: Clinic) { }
}
export class UpdateClinicSuccess implements Action {
    readonly type = ClinicsActionTypes.UPDATE_SUCCESS;
    constructor(public payload: Clinic) { }
}
export class UpdateClinicFail implements Action {
    readonly type = ClinicsActionTypes.UPDATE_FAIL;
    constructor(public payload: any) { }
}

export type ClinicsActions
  = UpdateClinic
  | UpdateClinicSuccess
  | UpdateClinicFail