import * as types from "./types";

export const INITIAL_STATE = { channels: {}, isLoading: false, error: null };

export function channelsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.CHANNEL_REQUEST:
      return { ...state, isLoading: true };
    case types.CHANNEL_REQUEST_FAILED:
      return {
        ...state,
        channels: {},
        isLoading: false,
        error: action.payload
      };
    case types.CHANNEL_REQUEST_SUCCESS:
      return {
        ...state,
        channels: action.payload,
        error: null,
        isLoading: false
      };
    default:
      return state;
  }
}
