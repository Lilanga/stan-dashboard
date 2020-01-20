import * as types from "./types";

export const INITIAL_STATE = { clients: {}, isLoading: false, error: null };

export function clientsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.CLIENT_REQUEST:
      return { ...state, isLoading: true };
    case types.CLIENT_REQUEST_FAILED:
      return { ...state, clients: {}, isLoading: false, error: action.payload };
    case types.CLIENT_REQUEST_SUCCESS:
      return {
        ...state,
        clients: action.payload,
        error: null,
        isLoading: false
      };
    default:
      return state;
  }
}
