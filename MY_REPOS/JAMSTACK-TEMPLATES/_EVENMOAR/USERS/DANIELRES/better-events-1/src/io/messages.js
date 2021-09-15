import io from "socket.io-client";
import store from "../store";
import { types } from "../store/messages";

const socket = io();

socket.emit("chat mounted", "user");

export const sendMessage = (message) => socket.emit("message", message);

socket.on("message", (message) =>
  store.dispatch({ type: "RECEIVE_MESSAGE", message })
);
