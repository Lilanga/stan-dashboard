import { createSelector } from "reselect";

const selectMessages = state => state.messageStore.messages;

export const selectAllMessages = createSelector(
  selectMessages,
  messages => messages
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
