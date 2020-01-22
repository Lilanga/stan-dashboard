import { eventChannel, END } from "redux-saga";

import {
  subscribeToChannel as sbsToChannel,
  unsubscribeFromChannel
} from "./webSocketUtils";

export async function subscribeToChannel(data) {
  const { channel, opts } = data;
  return eventChannel(emitter => {
    try {
      sbsToChannel(channel, opts, msg => {
        emitter(msg);
      });
    } catch (err) {
      console.error(err);
      emitter(END);
    }

    return () => {
      unsubscribeFromChannel(channel);
    };
  });
}
