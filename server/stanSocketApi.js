import { ChannelMessageHelper } from "./channelMessageHelper";

export class StanToSocketBridge {
  constructor(client) {
    this.client = client;
    this.channelMessageHelper = new ChannelMessageHelper();
  }

  async subscribeToChannel(data) {
    const { channel, opts } = data;
    try {
      this.channelMessageHelper.subscribeToChannel(
        channel,
        opts,
        (chn, msg) => {
          this.client.emit(chn, msg);
        }
      );
    } catch (err) {
      console.error(err);
    }
  }

  async unsubscribeFromChannel(channel) {
    return this.channelMessageHelper.unsubscribeFromChannel(channel);
  }

  async unsubscribeAll() {
    return this.channelMessageHelper.unsubscribeAll();
  }
}
