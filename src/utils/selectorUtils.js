import { createSelector } from "reselect";

const selectMessages = state => state.messageStore.messages;

export const selectAllMessages = createSelector(
  selectMessages,
  messages => messages
);

export const selectChannelMessages = createSelector(
  selectMessages,
  (_, channel) => channel,
  (messages, channel) => messages.filter(msg => msg.subject === channel),
  messages => messages
);
