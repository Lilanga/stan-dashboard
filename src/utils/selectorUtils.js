import { createSelector } from "reselect";

const selectMessages = state => state.messageStore.messages;
const selectClients = state => state.clientStore.clients;
const selectChannels = state => state.channelStore.channels;

export const selectAllMessages = createSelector(
  selectMessages,
  messages => messages
);

export const selectAllClients = createSelector(
  selectClients,
  clients => clients
);

export const selectAllChannels = createSelector(
  selectChannels,
  channels => channels
);

export const selectLastFiveMessages = createSelector(selectMessages, messages =>
  messages.slice(Math.max(messages.length - 5, 1))
);

export const selectAllMessagesCount = createSelector(
  selectMessages,
  messages => messages.length
);

export const selectChannelMessages = createSelector(
  selectMessages,
  (_, channel) => channel,
  (messages, channel) => messages.filter(msg => msg.subject === channel),
  messages => messages
);
