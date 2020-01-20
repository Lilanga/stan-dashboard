import * as types from "./types";

export function messageRequestSuccess(payload) {
  return { type: types.MESSAGE_REQUEST_SUCCESS, payload };
}

export function messageRequestFailed(payload) {
  return { type: types.MESSAGE_REQUEST_FAILED, payload };
}

export function messageRequest(payload) {
  return { type: types.MESSAGE_REQUEST, payload };
}
