import * as types from "./types";

export const INITIAL_STATE = { messages: {}, isLoading: false, error: null };

export function messagesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.MESSAGE_REQUEST:
      return { ...state, isLoading: true };
    case types.MESSAGE_REQUEST_FAILED:
      return {
        ...state,
        messages: {},
        isLoading: false,
        error: action.payload
      };
    case types.MESSAGE_REQUEST_SUCCESS:
      return {
        ...state,
        messages: action.payload,
        error: null,
        isLoading: false
      };
    default:
      return state;
  }
}
