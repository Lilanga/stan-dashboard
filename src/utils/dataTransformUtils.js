import moment from "moment-timezone";

// for recharts
export const getMessageData = messages => {
  let msg = messages;
  let msgCounts = [];

  let msgGroup = msg.reduce(function(r, a) {
    var round = 1000 * 60 * 5;
    var time = moment(a.timestamp);
    var rounded = new Date(Math.round(time.valueOf() / round) * round);
    var formatted = moment(rounded).format("hh:mm a");

    r[formatted] = r[formatted] || [];
    r[formatted].push(a);
    return r;
  }, Object.create(null));

  var msgGroupList = Object.keys(msgGroup).map(function(key) {
    return [key, msgGroup[key]];
  });

  msgGroupList.forEach(item => {
    msgCounts.push({
      time: item[0],
      messages: item[1].length
    });
  });

  if (msgCounts.length > 100) {
    msgCounts = msgCounts.slice(msgCounts.length - 100);
  }

  return msgCounts;
};

// for series charts
export const getSeriesMessageData = messages => {
  const messageData = getMessageData(messages);
  const time = messageData.map(message=>message.time);
  const msgs = messageData.map(message=>message.messages);

  const data = {
      labels: time,
      series: [msgs]
  };

  return data;
};