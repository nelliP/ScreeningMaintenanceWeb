import * as fromActions from '../actions';
import { Exception } from '../models/exception.model';

export interface State {
  exception: Exception;
};

const initialState: State = {
  exception: null
};

export function reducer(state = initialState, action: fromActions.Actions): State {
  switch (action.type) {
  //SAVE
    case fromActions.ExceptionActionTypes.SAVE: {
      const exception = action.payload;
      return Object.assign({}, state, {
        exception: exception
      });
    }
  //CLEAR
    case fromActions.ExceptionActionTypes.CLEAR: {
      return Object.assign({}, state, {
        exception: null
      });
    }
    
    default: {
      return state;
    }
  }
}
export const getException = (state: State) => state.exception;