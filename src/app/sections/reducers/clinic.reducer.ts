import * as fromActions from '../actions';
import { Clinic } from "../models/clinic.model";

export interface ClinicState {
    clinic: Clinic,
    clinicToUpdate: Clinic;
    updated: boolean;
    updating: boolean;
    clinicToCreate: Clinic;
  };
  
const initialState: ClinicState = {
    clinic: null,
    clinicToUpdate: null,
    updated: false,
    updating: false,
    clinicToCreate: null
};

export function reducer(
    state = initialState, 
    action: fromActions.ClinicsActions): ClinicState{
        switch (action.type) {
        //UPDATE         
            case fromActions.ClinicsActionTypes.UPDATE: {
                const clinic: Clinic = action.payload;
                return {
                    ...state,
                    updating: true,
                    updated: false,
                    clinicToUpdate: clinic
                };
            }
            case fromActions.ClinicsActionTypes.UPDATE_SUCCESS: {
                const clinic: Clinic = action.payload;
                return {
                    ...state,
                    updating: false,
                    updated: true,
                    clinicToUpdate: null,
                    clinic
                };
            }
            case fromActions.ClinicsActionTypes.UPDATE_FAIL: {
                return {
                    ...state,
                    updating: false,
                    updated: false,
                    clinicToUpdate: null
                };
            }
            
            default: {
              return state;
        }
    }
}

export const getClinicUpdated = (state: ClinicState) => state.clinic;
export const getClinicsUpdatedSuccess = (state: ClinicState) => state.updated;
export const getClinicsUpdating = (state: ClinicState) => state.updating;
export const getClinicToUpdate = (state: ClinicState) => state.clinicToUpdate;