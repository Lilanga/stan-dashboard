import express from "express";
const http = require("http");
const socketio = require("socket.io");
const bodyParser = require("body-parser");

import { proxy } from "./utils/stan";

import { getStanOptions, setStanOptions } from "./stanOptionsApi";
import { channelMessageList } from "./channelMessagesApi";
import { StanToSocketBridge } from "./stanSocketApi";

const app = express();

app.use(express.static("dist"));
app.use(express.json());

const httpChannel = http.Server(app);
app.use("/streaming", proxy);
app.get("/api/server", getStanOptions);
app.post("/api/server", bodyParser.json(), setStanOptions);
app.get("/api/channel/:channel/message", channelMessageList);
app.get("*", (req, res) => {
  res.status(404).send("Not here.");
});

// SETUP WEB SOCKETS
const io = socketio(httpChannel);
io.on("connection", client => {
  const clientMessageBridge = new StanToSocketBridge(client);

  client.on("subscribe-to-channel", data => {
    clientMessageBridge.subscribeToChannel(data);
  });

  client.on("unsubscribe-from-channel", channel => {
    clientMessageBridge.unsubscribeFromChannel(channel);
  });
});

const PORT = process.env.PORT || 3000;
httpChannel.listen(PORT, () => console.log("Listening on port %s!", PORT));
