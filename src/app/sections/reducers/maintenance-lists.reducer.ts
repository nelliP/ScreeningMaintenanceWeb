import * as fromActions from '../actions';
import { MaintenanceLists } from '../models/maintenance-lists.model';

export interface MaintenanceListsState {
    data: MaintenanceLists;
    shortTitles: string[];
    loaded: boolean;
    loading: boolean;
  };
  
const initialState: MaintenanceListsState = {
    data: null,
    shortTitles: null,
    loaded: false,
    loading: false,
};

export function reducer(
    state = initialState, 
    action: fromActions.MaintenanceListsActions): MaintenanceListsState{
        switch (action.type) {
        //LOAD
            case fromActions.MaintenanceListsActionTypes.LOAD: {              
              return {
                  ...state,
                  loaded: false,
                  loading: true
              };
            }
            case fromActions.MaintenanceListsActionTypes.LOAD_SUCCESS: {                
                const data = action.payload;               
              return {
                    ...state,
                    loaded: true,
                    loading: false,
                    data,
                    shortTitles: setShortTitles(data)
                };
                
            }
            case fromActions.MaintenanceListsActionTypes.LOAD_FAIL: {
                return {
                    ...state,
                    loaded: false,
                    loading: false                    
                };
            }  
            default: {
              return state;
        }
    }
}

function setShortTitles(data: MaintenanceLists): string[]{
    var shortTitles: string[] = new Array<string>();
    data.clinics.forEach((clinic) =>{shortTitles.push(clinic.avdTeam.toUpperCase().trim())}); 
return shortTitles;
}

export const getMaintenanceListsLoading = (state: MaintenanceListsState) => state.loading;
export const getMaintenanceLists = (state: MaintenanceListsState) => state.data;
export const getMaintenanceListsLoaded = (state: MaintenanceListsState) => state.loaded;
export const getShortTitles = (state: MaintenanceListsState) => state.shortTitles;