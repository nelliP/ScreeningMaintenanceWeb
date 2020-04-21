import * as fromActions from '../actions';
import { Maintenance } from '../models/maintenance.model';
import { Clinic } from '../models/clinic.model';

export interface MaintenanceState {
    data: Maintenance;
    clinic: Clinic;
    created: boolean;
    creating: boolean;
    regionDivisionForCreate: string;
    screeningTypeForCreate: string;
    updated: boolean;
    updating: boolean;
    maintenanceToUpdate: Maintenance;
  };
  
const initialState: MaintenanceState = {
    data: null,
    clinic: null,
    created: false,
    creating: false,
    regionDivisionForCreate: '',
    screeningTypeForCreate: '',
    updated: false,
    updating: false,
    maintenanceToUpdate: null
};

export function reducer(
    state = initialState, 
    action: fromActions.MaintenanceActions): MaintenanceState{
        switch (action.type) {
        //CREATE
            case fromActions.MaintenanceActionTypes.CREATE: {
              const regionDivisionForCreate = action.payload1;
              const screeningTypeForCreate = action.payload2;
              return {
                  ...state,
                  created: false,
                  creating: true,
                  regionDivisionForCreate,
                  screeningTypeForCreate
              };
            }
            case fromActions.MaintenanceActionTypes.CREATE_SUCCESS: {
                const data = action.payload;
               
              return {
                    ...state,
                    created: true,
                    creating: false,                    
                    regionDivisionForCreate: '',
                    screeningTypeForCreate: '',
                    data
                };
            }
            case fromActions.MaintenanceActionTypes.CREATE_FAIL: {
                return {
                    ...state,
                    created: false,
                    creating: false                    
                };
            }
        //UPDATE_NEW
            case fromActions.MaintenanceActionTypes.UPDATE_NEW: {
                const maintenanceToUpdate = action.payload;
                return {
                    ...state,
                    updated: false,
                    updating: true,
                    maintenanceToUpdate
                };
              }
              case fromActions.MaintenanceActionTypes.UPDATE_NEW_SUCCESS: {
                  const clinic = action.payload;                 
                return {
                      ...state,
                      updated: true,
                      updating: false,                    
                      maintenanceToUpdate: null,
                      clinic
                  };
              }
              case fromActions.MaintenanceActionTypes.UPDATE_NEW_FAIL: {
                  return {
                      ...state,
                      updated: false,
                      updating: false                   
                  };
              }  
            default: {
              return state;
        }
    }
}

export const getMaintenanceCreating = (state: MaintenanceState) => state.creating;
export const getMaintenance = (state: MaintenanceState) => state.data;
export const getMaintenanceCreated = (state: MaintenanceState) => state.created;

export const getMaintenanceUpdating = (state: MaintenanceState) => state.updating;
export const getMaintenanceUpdated = (state: MaintenanceState) => state.clinic;
export const getMaintenanceUpdatedSuccess = (state: MaintenanceState) => state.updated;
export const getMaintenanceToUpdate = (state: MaintenanceState) => state.maintenanceToUpdate;