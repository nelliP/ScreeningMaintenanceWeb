import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer';

export interface AuthState {
    status: fromAuth.State;
}

export const reducers: ActionReducerMap<AuthState> = {
    status: fromAuth.reducer
};

export const selectAuthFeatureState = createFeatureSelector<AuthState>('auth');
export const selectAuthStatusState = createSelector(selectAuthFeatureState, (state: AuthState) => state.status);
export const getLoading = createSelector(selectAuthStatusState, fromAuth.getLoading);
export const getUser = createSelector(selectAuthStatusState, fromAuth.getUser);