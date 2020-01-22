import { getStanInstance } from "./stan";
const Promise = require("bluebird");

export class ChannelMessageHelper {
  constructor() {
    this.subscriptions = {};
  }

  async subscribeToChannel(channel, opts, fn) {
    try {
      const stan = await getStanInstance();
      const subscription = stan.subscribe(channel, opts, msg => {
        const message = {
          sequence: msg.getSequence(),
          timestamp: msg.getTimestamp(),
          subject: msg.getSubject(),
          data: msg.getData()
        };
        fn(channel, message);
      });
      this.subscriptions[channel] = { stan, subscription };
    } catch (err) {
      console.error(err);
    }
  }

  waitDelay(milisecs) {
    return function(arg) {
      return new Promise(resolve => setTimeout(() => resolve(arg), milisecs));
    };
  }
  async unsubscribeFromChannel(channel) {
    return new Promise((resolve, reject) => {
      try {
        console.log("unsubscribing From Channel: " + channel);
        let subscription = undefined;

        if (this.subscriptions[channel]) {
          subscription = this.subscriptions[channel].subscription;
        }

        if (subscription !== undefined) {
          subscription.unsubscribe();
          subscription.on("unsubscribed", () => {
            console.log("unsubscribing From Channel: " + channel + " success");
            resolve();
          });
        }
        resolve();
      } catch (err) {
        console.log("unsubscribing From Channel: " + channel + " failed");
        resolve(err);
      }
    });
  }

  async unsubscribeAll() {
    const promises = this.subscriptions.map((sub, channel) => {
      this.unsubscribeFromChannel(channel);
    });
    return Promise.all(promises);
  }
}
