import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUsers from './users.reducer';

export interface UsersState {
    users: fromUsers.State;
}

export const reducers: ActionReducerMap<UsersState> = {
    users: fromUsers.reducer
};

export const selectUsersFeatureState = createFeatureSelector<UsersState>('users');
export const selectUsersState = createSelector(selectUsersFeatureState, state => state.users);
export const getUsers = createSelector(selectUsersState, fromUsers.getUsers);
export const getLoading = createSelector(selectUsersState, fromUsers.getLoading);
export const getSelectedUser = createSelector(selectUsersState, fromUsers.getSelectedUser);