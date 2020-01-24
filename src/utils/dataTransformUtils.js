import moment from "moment-timezone";

export const getMessageData = messages => {
  let msg = messages;
  let msgCounts = [];
  if (messages.length > 60) {
    msg = messages.slice(messages.length - 60);
  }

  let msgGroup = msg.reduce(function(r, a) {
    var round = 1000 * 60 * 5;
    var time = moment(a.timestamp);
    var rounded = new Date(Math.round(time.valueOf() / round) * round);
    var formatted = moment(rounded).format("hh:mm a");

    // var formatted = time.format('YYYY-MM-DD hh:mm a')
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

  return msgCounts;
};
