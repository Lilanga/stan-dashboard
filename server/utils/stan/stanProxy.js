import proxy from "http-proxy-middleware";
import { options } from "./stanUtils";

const proxies = {};

const _proxy = (req, res, next) => {
  if (!proxies[options.monitor]) {
    proxies[options.monitor] = proxy("/streaming", {
      target: options.monitor,
      ws: true
    });
  }
  proxies[options.monitor](req, res, next);
};
export { _proxy as proxy };
