import callAPI from "./callApi";

export function getServers() {
  return callAPI("get", "", "/streaming/serverz").then(resp => resp.data);
}

export function getStores() {
  return callAPI("get", "", "/streaming/storez").then(resp => resp.data);
}

export function getClients() {
  return callAPI("get", "", "/streaming/clientsz", { subs: 1 }).then(
    resp => resp.data
  );
}

export function getChannels() {
  return callAPI("get", "", "/streaming/channelsz", { subs: 1 }).then(
    resp => resp.data
  );
}

export function getMessages(channel) {
  return callAPI("get", "", `/api/channel/${channel}/message`).then(
    resp => resp.data
  );
}

export function getServerConfig() {
  return callAPI("get", "/api/server").then(resp => resp.data);
}

export async function updateServerConfig(data) {
  return callAPI("post", "", "/api/server", data).then(resp => resp.data);
}
