import * as types from "./types";

export function clientsRequestSuccess(payload) {
  return { type: types.CLIENT_REQUEST_SUCCESS, payload };
}

export function clientsRequestFailed(payload) {
  return { type: types.CLIENT_REQUEST_FAILED, payload };
}

export function clientsRequest(payload) {
  return { type: types.CLIENT_REQUEST, payload };
}
