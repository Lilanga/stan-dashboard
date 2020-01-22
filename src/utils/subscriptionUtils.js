import { eventChannel, END } from "redux-saga";

const { getStanInstance } = require("../../server/utils/stan");
window.subscriptions = {};

export async function subscribeToChannel(data) {
  const { channel, opts } = data;
  let instance = await getStanInstance();
  return eventChannel(emitter => {
    try {
      instance.then(stan => {
        const subscription = this.stan.subscribe(channel, opts, msg => {
          const message = {
            sequence: msg.getSequence(),
            timestamp: msg.getTimestamp(),
            subject: msg.getSubject(),
            data: msg.getData()
          };
          emitter(message);
        });
        window.subscriptions[channel] = { stan, subscription };
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

export function unsubscribeFromChannel(channel) {
  // const { subscription } = window.subscriptions[channel]
  // return new Promise((resolve, reject) => {
  //   subscription.unsubscribe()
  //   subscription.on('unsubscribed', () => {
  //     resolve()
  //   })
  // })
}

export function unsubscribeAll() {
  // const promises = window.subscriptions.map((sub, channel) => {
  //   this.unsubscribeFromChannel(channel)
  // })
  // return Promise.all(promises)
}
