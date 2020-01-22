import { ChannelMessageHelper } from "./utils/channelMessageHelper";
const Promise = require("bluebird");
const msgHelper = new ChannelMessageHelper();

export async function channelMessageList(req, res) {
  try {
    const { channel } = req.params;
    const opts = { startAtSequence: 10 };
    const messages = [];

    const disposer = getStanSubscription(channel, opts, (chn, msg) => {
      console.log("Recieved: %s, %s", chn, msg);
      messages.push(msg);
    });

    Promise.using(disposer, async () => {
      await Promise.delay(2000);
      res.send(messages);
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
}

function getStanSubscription(channel, opts, fn) {
  return Promise.resolve(
    msgHelper.subscribeToChannel(channel, opts, fn)
  ).disposer(() => {
    return new Promise((resolve, reject) => {
      msgHelper
        .unsubscribeFromChannel(channel)
        .then(() => {
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  });
}
