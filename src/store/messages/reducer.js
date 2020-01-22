import * as types from "./types";

export const INITIAL_STATE = {
  messages: [],
  isLoading: false,
  error: null,
  isSocketOpen: false
};

export function messagesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.MESSAGE_REQUEST:
      return { ...state, isLoading: true };
    case types.MESSAGE_SUBSCRIPTION_REQUEST:
      return { ...state, isLoading: true, isSocketOpen: true };
    case types.MESSAGE_SUBSCRIPTION_END:
      return { ...state, isLoading: false, isSocketOpen: false };
    case types.MESSAGE_SUBSCRIPTION_RECEIVED:
      return {
        ...state,
        messages: [...state.messages, action.payload],
        isLoading: false
      };
    case types.MESSAGE_REQUEST_FAILED:
      return {
        ...state,
        messages: [],
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
