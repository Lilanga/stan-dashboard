import * as effects from "@redux-saga/core/effects";

import * as actions from "./actions";
import { CLIENT_REQUEST } from "./types";
import { getClients } from "../../utils/stanApi";

function* handleGetClients(action) {
  try {
    const res = yield effects.call(getClients);
    if (res) {
      yield effects.put(actions.clientsRequestSuccess(res));
    }
  } catch (err) {
    yield effects.put(actions.clientsRequestFailed(err));
  }
}

function* watchClientsRequest() {
  yield effects.takeEvery(CLIENT_REQUEST, handleGetClients);
}

export function* ClientSaga() {
  yield effects.all([effects.fork(watchClientsRequest)]);
}
