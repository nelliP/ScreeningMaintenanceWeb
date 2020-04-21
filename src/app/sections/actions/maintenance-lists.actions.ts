import { Action } from '@ngrx/store';
import { MaintenanceLists } from '../models/maintenance-lists.model';

export enum MaintenanceListsActionTypes {
  LOAD = '[Sections] Load MaintenanceLists',
  LOAD_SUCCESS = '[Sections] Load MaintenanceLists Success',
  LOAD_FAIL = '[Sections] Load MaintenanceLists Fail',
};

//LOAD ActionCreators
export class LoadMaintenanceLists implements Action {
    readonly type = MaintenanceListsActionTypes.LOAD;
    constructor() { }
}
export class LoadMaintenanceListsSuccess implements Action {
    readonly type = MaintenanceListsActionTypes.LOAD_SUCCESS;
    constructor(public payload: MaintenanceLists) { }
}
export class LoadMaintenanceListsFail implements Action {
    readonly type = MaintenanceListsActionTypes.LOAD_FAIL;
    constructor(public payload: any) { }
}

export type MaintenanceListsActions
  = LoadMaintenanceLists 
  | LoadMaintenanceListsSuccess 
  | LoadMaintenanceListsFail
  