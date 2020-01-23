export async function callAPI(method, host, path, data) {
  let url = host + path;

  if (method === "get" && data !== undefined) {
    url += (url.indexOf("?") === -1 ? "?" : "&") + getQueryString(data);
  }

  return fetch(url + path, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: method === "get" ? undefined : JSON.stringify(data)
  })
    .then(res => res.json())
    .catch(err => {
      console.log(err);
      throw err;
    });
}

function getQueryString(params) {
  return Object.keys(params)
    .map(k => {
      if (Array.isArray(params[k])) {
        return params[k]
          .map(val => `${encodeURIComponent(k)}[]=${encodeURIComponent(val)}`)
          .join("&");
      }

      return `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`;
    })
    .join("&");
}
