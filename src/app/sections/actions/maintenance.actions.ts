import { Action } from '@ngrx/store';
import { Maintenance } from '../models/maintenance.model';
import { Clinic } from '../models/clinic.model';

export enum MaintenanceActionTypes {
  CREATE = '[Sections] Create Maintenance',
  CREATE_SUCCESS = '[Sections] Create Maintenance Success',
  CREATE_FAIL = '[Sections] Create Maintenance Fail',

  UPDATE_NEW = '[Sections] Update New Maintenance',
  UPDATE_NEW_SUCCESS = '[Sections] Update New Maintenance Success',
  UPDATE_NEW_FAIL = '[Sections] Update New Maintenance Fail'
};

//CREATE ActionCreators
export class CreateMaintenance implements Action {
    readonly type = MaintenanceActionTypes.CREATE;
    constructor(public payload1: string, public payload2: string) { }
}
export class CreateMaintenanceSuccess implements Action {
    readonly type = MaintenanceActionTypes.CREATE_SUCCESS;
    constructor(public payload: Maintenance) { }
}
export class CreateMaintenanceFail implements Action {
    readonly type = MaintenanceActionTypes.CREATE_FAIL;
    constructor(public payload: any) { }
}

//UPDATE_NEW ActionCreators
export class UpdateNewMaintenance implements Action {
    readonly type = MaintenanceActionTypes.UPDATE_NEW;
    constructor(public payload: Maintenance) { }
}
export class UpdateNewMaintenanceSuccess implements Action {
    readonly type = MaintenanceActionTypes.UPDATE_NEW_SUCCESS;
    constructor(public payload: Clinic) { }
}
export class UpdateNewMaintenanceFail implements Action {
    readonly type = MaintenanceActionTypes.UPDATE_NEW_FAIL;
    constructor(public payload: any) { }
}

export type MaintenanceActions
  = CreateMaintenance 
  | CreateMaintenanceSuccess 
  | CreateMaintenanceFail
  | UpdateNewMaintenance
  | UpdateNewMaintenanceSuccess
  | UpdateNewMaintenanceFail
  