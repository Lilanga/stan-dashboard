import * as effects from "redux-saga/effects";

import * as actions from "./actions";
import { CHANNEL_REQUEST } from "./types";
import { getChannels } from "../../utils/stanApi";

function* handleGetChannels(action) {
  try {
    const res = yield effects.call(getChannels());
    if (res) {
      yield effects.put(actions.channelRequestSuccess(res));
    }
  } catch (err) {
    yield effects.put(actions.channelRequestFailed(err));
  }
}

function* watchChannelRequest() {
  yield effects.takeEvery(CHANNEL_REQUEST, handleGetChannels);
}

export function* channelSaga() {
  yield effects.all([effects.fork(watchChannelRequest)]);
}
