import * as effects from "redux-saga/effects";

import * as actions from "./actions";
import { MESSAGE_REQUEST } from "./types";
import { getMessages } from "../../utils/stanApi";

function* handleGetMessages(action) {
  try {
    const res = yield effects.call(getMessages, action.payload.channel);
    if (res) {
      yield effects.put(actions.messageRequestSuccess(res));
    }
  } catch (err) {
    yield effects.put(actions.messageRequestFailed(err));
  }
}

function* watchMessageRequest() {
  yield effects.takeEvery(MESSAGE_REQUEST, handleGetMessages);
}

export function* messageSaga() {
  yield effects.all([effects.fork(watchMessageRequest)]);
}
