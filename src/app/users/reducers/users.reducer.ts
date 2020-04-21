import {UsersActions, UsersActionTypes} from './../actions/users.actions';
import {User} from "./../models/user.model";


export interface State {
  users: User[];
  loading: boolean;
  selectedUser: User;
};

const initialState: State = {
  users: [],
  loading: false,
  selectedUser: null
};

export function reducer(state = initialState, action: UsersActions): State {
  switch (action.type) {
    case UsersActionTypes.Load: {
      return Object.assign({}, state, {
        users: [],
        loading: true
      });
    }

    case UsersActionTypes.LoadSuccess: {
      const users = action.payload;

      return Object.assign({}, state, {
        users: users,
        loading: false
      });
    }

    case UsersActionTypes.LoadFail: {
      return Object.assign({}, state, {
        users: [],
        loading: false
      });
    }

    case UsersActionTypes.Select: {
      return Object.assign({}, state, {
        loading: true,
        selectedUser: null
      })
    }

    case UsersActionTypes.SelectSuccess: {
      const user = action.payload;

      return Object.assign({}, state, {
        loading: false,
        selectedUser: user
      });
    }

    case UsersActionTypes.SelectFail: {
      return Object.assign({}, state, {
        loading: false,
        selectedUser: null
      });
    }

    case UsersActionTypes.New: {
      return Object.assign({}, state, {
        selectedUser: null
      })
    }

    default: {
      return state;
    }
  }
}

export const getUsers = (state: State) => state.users;
export const getLoading = (state: State) => state.loading;
export const getSelectedUser = (state: State) => state.selectedUser;