import axios from "axios";
import { options } from "./utils/stan";

export async function getStanOptions(req, res) {
  if (options.server.split("@").length > 1) {
    options.server = `nats://${options.server.split("@")[1]}`;
  }
  res.status(200).send(options);
}

export async function setStanOptions(req, res) {
  const { host, port, monitoringPort } = req.body;
  try {
    const resp = await axios({
      method: "get",
      baseURL: `http://${host}:${monitoringPort}/`,
      url: "/streaming/serverz",
      headers: { Accept: "application/json" },
      proxy: false
    });
    updateOptions(resp.data, host, port, monitoringPort);
    res.status(200).send({ options, data: resp.data });
  } catch (err) {
    console.error(err);
    res.status(500).send({ status: "error" });
  }
}

function updateOptions(data, host, port, monitoringPort) {
  (options.server = `nats://${host}:${port}`),
    (options.monitor = `http://${host}:${monitoringPort}`),
    (options.cluster = data.cluster_id);
}
