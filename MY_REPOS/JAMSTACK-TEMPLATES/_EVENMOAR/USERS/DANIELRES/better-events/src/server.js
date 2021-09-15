// @flow
const cors = require("cors");
const app = require("express")();
// flow-disable-next-line
const http = require("http").Server(app);
const io = require("socket.io")(http);
import type { Message } from "./types";

const PORT = process.env.PORT || 3001;
app.use(cors());

let messages = [];

const persistMessage = (message: Message) =>
  new Promise((resolve, reject) => {
    messages = [...messages, message];
    resolve();
  });

let i = 1;
io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("message", async (m) => {
    try {
      await persistMessage(m);
      io.emit("message", (m: Message));
    } catch (error) {
      console.error(error);
    }
  });
});

http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
