# STAN DASH BOARD

STAN Dashboard is a server dashboard for stan server to list down various aspects of the STAN server.

## Build setup

- Please use `yarn` for building the project since npm is not supported

### Environment variables for docker container

- PORT : port for the server
- STAN_URL : stan server url with port `nats://localhost:4223`
- STAN_MONITOR_URL : stan server monitor url with port `http://localhost:8222`
- STAN_CLUSTER : stan cluster to monitor `processing`

### TODO

- Json payloads only, needs to implement msgpack decoding
- Needs to implement detailed sections for messages, channels, clients and subscriptions
- Needs to isolate client package from server package
