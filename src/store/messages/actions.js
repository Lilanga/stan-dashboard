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

export function messageSubscriptionRequest(payload) {
  return { type: types.MESSAGE_SUBSCRIPTION_REQUEST, payload };
}

export function messageSubscriptionRecieved(payload) {
  return { type: types.MESSAGE_SUBSCRIPTION_RECEIVED, payload };
}

export function messageSubscriptionEnd() {
  return { type: types.MESSAGE_SUBSCRIPTION_END };
}
