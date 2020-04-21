import { ActionReducerMap, ActionReducer, MetaReducer, createFeatureSelector } from '@ngrx/store';
import { Params, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { environment } from '../environments/environment';
import * as fromRouter from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';

/* According to the docs this custom serializer is good: https://github.com/ngrx/platform/blob/v4.1.1/docs/router-store/api.md#custom-router-state-serializer */
export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface AppState {
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
}

export class CustomRouterStateSerializer implements fromRouter.RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;
    const queryParams = routerState.root.queryParams;
    let state: ActivatedRouteSnapshot = routerState.root;
    //iterating through angular's router statetree
    while(state.firstChild){
      state = state.firstChild;
    }
    const { params } = state;
    // Only return an object including the URL and query params
    // instead of the entire snapshot
    //returns an object which is bound to the statetree
    return { url, queryParams, params };
  }
}

export const reducers: ActionReducerMap<AppState> = {
  routerReducer: fromRouter.routerReducer,
};

export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
    return function (state: AppState, action: any): AppState {
        console.log('state', state);
        console.log('action', action);
        return reducer(state, action);
    };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
    ? [logger, storeFreeze]
    : [];

export const getRouterState = createFeatureSelector
<fromRouter.RouterReducerState<RouterStateUrl>>
('routerReducer');