import {AuthActionTypes, AuthActions} from './../actions/auth.actions';
import { User } from 'oidc-client';


export interface State {
  user: User;
  loading: boolean;
};

const initialState: State = {
  user: null,
  loading: true
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
      case AuthActionTypes.LoadingUser: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case AuthActionTypes.RedirectSuccess:
    case AuthActionTypes.UserFound: {
      const user = action.payload;

      return Object.assign({}, state, {
        user: user,
        loading: false
      });
    }

    case AuthActionTypes.SilentRenewError:
    case AuthActionTypes.UserExpired: {
      return Object.assign({}, state, {
        loading: false
      });
    }

    case AuthActionTypes.UserSignedOut:
    case AuthActionTypes.SessionTerminated: {
      return Object.assign({}, state, {
        user: null,
        loadding: false
      })
    }

    default: {
      return state;
    }
  }
}

export const getUser = (state: State) => state.user;
export const getLoading = (state: State) => state.loading;