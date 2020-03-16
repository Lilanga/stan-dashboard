import { callAPI } from "./callApi";

export async function getServers() {
  return await callAPI("get", "", "/streaming/serverz");
}

export async function getStores() {
  return await callAPI("get", "", "/streaming/storez");
}

export async function getClients(params) {
  return await callAPI("get", "", "/streaming/clientsz", params);
}

export async function getChannels(params) {
  return await callAPI("get", "", "/streaming/channelsz", params);
}

export async function getMessages(channel) {
  return await callAPI("get", "", `/api/channel/${channel}/message`);
}

export async function getServerConfig() {
  return await callAPI("get", "/api/server");
}

export async function updateServerConfig(data) {
  return await callAPI("post", "", "/api/server", data);
}
