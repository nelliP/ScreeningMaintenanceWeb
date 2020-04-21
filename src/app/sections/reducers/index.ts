import * as fromMaintenanceListsReducer from '../reducers/maintenance-lists.reducer';
import * as fromMaintenanceReducer from '../reducers/maintenance.reducer';
import * as fromClinicReducer from '../reducers/clinic.reducer';
import * as fromAddressReducer from '../reducers/address.reducer';
import * as fromInvitationReducer from '../reducers/invitation.reducer';
import * as fromExceptionReducer from './exception.reducer';
//store
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface MaintenanceState{
    maintenanceLists: fromMaintenanceListsReducer.MaintenanceListsState,
    maintenance: fromMaintenanceReducer.MaintenanceState,
    clinics: fromClinicReducer.ClinicState,
    addresses: fromAddressReducer.AddressState,
    invitations: fromInvitationReducer.InvitationState,
    exception: fromExceptionReducer.State;
}

export const maintenanceReducers: ActionReducerMap<MaintenanceState> = {
    maintenanceLists: fromMaintenanceListsReducer.reducer,
    maintenance: fromMaintenanceReducer.reducer,
    clinics: fromClinicReducer.reducer,
    addresses: fromAddressReducer.reducer,
    invitations: fromInvitationReducer.reducer,
    exception: fromExceptionReducer.reducer
};

//MAIN-Selectors
export const getMaintenancesFeatureState = createFeatureSelector<MaintenanceState>('maintenances');

//MaintenanceListsSelectors
export const getMaintenanceListsState = createSelector(getMaintenancesFeatureState, state => state.maintenanceLists);

export const getMaintenanceLists = createSelector(getMaintenanceListsState, fromMaintenanceListsReducer.getMaintenanceLists);
export const getMaintenanceListsLoading = createSelector(getMaintenanceListsState, fromMaintenanceListsReducer.getMaintenanceListsLoading);
export const getMaintenanceListsLoaded = createSelector(getMaintenanceListsState, fromMaintenanceListsReducer.getMaintenanceListsLoaded);
export const getShortTitles = createSelector(getMaintenanceListsState, fromMaintenanceListsReducer.getShortTitles);

//MaintenanceSelectors
export const getMaintenanceState = createSelector(getMaintenancesFeatureState, state=> state.maintenance);

export const getMaintenance = createSelector(getMaintenanceState, fromMaintenanceReducer.getMaintenance);
export const getMaintenanceCreating = createSelector(getMaintenanceState, fromMaintenanceReducer.getMaintenanceCreating);
export const getMaintenanceCreated = createSelector(getMaintenanceState, fromMaintenanceReducer.getMaintenanceCreated);


export const getMaintenanceUpdating = createSelector(getMaintenanceState, fromMaintenanceReducer.getMaintenanceUpdating);
export const getMaintenanceUpdated = createSelector(getMaintenanceState, fromMaintenanceReducer.getMaintenanceUpdated);
export const getMaintenanceUpdatedSuccess = createSelector(getMaintenanceState, fromMaintenanceReducer.getMaintenanceUpdatedSuccess);
export const getMaintenanceToUpdate  = createSelector(getMaintenanceState, fromMaintenanceReducer.getMaintenanceToUpdate);

//ClinicSelectors
export const getClinicState = createSelector(getMaintenancesFeatureState, state => state.clinics);

export const getClinicToUpdate = createSelector(getClinicState, fromClinicReducer.getClinicToUpdate);
export const getClinicsUpdatedSuccess = createSelector(getClinicState, fromClinicReducer.getClinicsUpdatedSuccess);
export const getClinicUpdated = createSelector(getClinicState, fromClinicReducer.getClinicUpdated);
export const getClinicsUpdating = createSelector(getClinicState, fromClinicReducer.getClinicsUpdating);

//AddressSelectors
export const getAddressState = createSelector(getMaintenancesFeatureState, state => state.addresses);

export const getAddressToUpdate = createSelector(getAddressState, fromAddressReducer.getAddressToUpdate);
export const getAddressesUpdatedSuccess = createSelector(getAddressState, fromAddressReducer.getAddressesUpdatedSuccess);
export const getAddressUpdated = createSelector(getAddressState, fromAddressReducer.getAddressUpdated);
export const getAddressesUpdating = createSelector(getAddressState, fromAddressReducer.getAddressesUpdating);

//InvitationSelectors
export const getInvitationState = createSelector(getMaintenancesFeatureState, state => state.invitations);

export const getInvitationToUpdate = createSelector(getInvitationState, fromInvitationReducer.getInvitationToUpdate);
export const getInvitationsUpdatedSuccess = createSelector(getInvitationState, fromInvitationReducer.getInvitationsUpdatedSuccess);
export const getInvitationUpdated = createSelector(getInvitationState, fromInvitationReducer.getInvitationUpdated);
export const getInvitationsUpdating = createSelector(getInvitationState, fromInvitationReducer.getInvitationsUpdating);

//ExceptionSelectors
export const getExceptionState = createSelector(getMaintenancesFeatureState, state => state.exception);
export const getException = createSelector(getExceptionState, fromExceptionReducer.getException);