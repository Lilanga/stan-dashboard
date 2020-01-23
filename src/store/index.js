import { combineReducers } from "redux";
import { all, fork } from "redux-saga/effects";
import { messagesReducer, messageSaga } from "./messages";
import { channelsReducer, channelSaga } from "./channel";
import { clientsReducer, ClientSaga } from "./clients";

export const rootReducer = combineReducers({
  messageStore: messagesReducer,
  clientStore: clientsReducer,
  channelStore: channelsReducer
});

export function* rootSaga() {
  yield all([fork(messageSaga), fork(channelSaga), fork(ClientSaga)]);
}
