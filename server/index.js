import express from "express";
const _http = require("http");
const socketio = require("socket.io");
const bodyParser = require("body-parser");

import { proxy } from "./utils/stan";

import { getStanOptions, setStanOptions } from "./stanOptionsApi";
import { channelMessageList } from "./channelMessagesApi";
// const { Bridge } = require('./events/nats-to-socketio')
// const { options } = require('./nats-ss')

const app = express();

app.use(express.static("dist"));
app.use(express.json());

const http = _http.Server(app);
app.use("/streaming", proxy);
app.get("/api/server", getStanOptions);
app.post("/api/server", bodyParser.json(), setStanOptions);
app.get("/api/channel/:channel/message", channelMessageList);
app.get("*", (req, res) => {
  res.status(404).send("Not here.");
});

app.listen(3000, () => console.log("Listening on port 3000!"));
