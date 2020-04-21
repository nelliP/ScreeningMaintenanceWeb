import * as fromActions from '../actions';
import { Address } from "../models/address.model";

export interface AddressState {
    address: Address;
    addressToUpdate: Address;
    updated: boolean;
    updating: boolean;
    addressToCreate: Address;
  };
  
const initialState: AddressState = {
    address: null,
    addressToUpdate: null,
    updated: false,
    updating: false,
    addressToCreate: null
};

export function reducer(
    state = initialState, 
    action: fromActions.AddressesActions): AddressState{
        switch (action.type) {            
        //UPDATE
            case fromActions.AddressesActionTypes.UPDATE: {
                const address: Address = action.payload;
                return{
                    ...state,
                    updating: true,
                    addressToUpdate: address
                };
            }            
            case fromActions.AddressesActionTypes.UPDATE_SUCCESS: {
                const address = action.payload;
                return {
                    ...state,
                    updating: false,
                    updated: true,
                    addressToUpdate: null,
                    address
                };
            }
            case fromActions.AddressesActionTypes.UPDATE_FAIL: {
                return {
                    ...state,
                    updating: false,
                    updated: false,
                    addressToUpdate: null
                };
            }
           
            default: {
              return state;
        }
    }
}

export const getAddressUpdated = (state: AddressState) => state.address;
export const getAddressesUpdatedSuccess = (state: AddressState) => state.updated;
export const getAddressesUpdating = (state: AddressState) => state.updating;
export const getAddressToUpdate = (state: AddressState) => state.addressToUpdate;