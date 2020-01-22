import { getInstance } from "./stanHelper";

const defaults = {
  server: process.env.STAN_URL || "nats://localhost:4223",
  monitor: process.env.STAN_MONITOR_URL || "http://localhost:8222",
  cluster: process.env.STAN_CLUSTER || "processing",
  appName: "stan-dashboard"
};

export const options = Object.assign({}, defaults);

export async function getStanInstance() {
  const { server, cluster, appName } = exports.options;
  return getInstance(server, cluster, appName);
}
