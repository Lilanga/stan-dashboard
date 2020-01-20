import * as types from "./types";

export function channelRequestSuccess(payload) {
  return { type: types.CHANNEL_REQUEST_SUCCESS, payload };
}

export function channelRequestFailed(payload) {
  return { type: types.CHANNEL_REQUEST_FAILED, payload };
}

export function channelRequest(payload) {
  return { type: types.CHANNEL_REQUEST, payload };
}
