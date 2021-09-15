// @flow
import Head from "next/head";

import io from "socket.io-client";
import * as React from "react";
import { render } from "react-dom";
import type { Message } from "../types";

const socket = io("http://localhost:3001");

type Props = { url: Object };
type State = {
  status: "connected" | "disconnected",
  messages: Array<Message>,
  messageForm: { body: string },
};

let i = 0;
const authorId = "AUTHOR_ID";

export default class App extends React.Component<Props, State> {
  state = {
    status: "disconnected",
    messages: [],
    messageForm: {
      body: "",
    },
  };

  componentDidMount() {
    socket.on("connect", () => this.setState({ status: "connected" }));

    socket.on("message", (message: Message) => {
      this.setState({ messages: [...this.state.messages, message] });
      if (message.authorId === authorId)
        this.setState({ messageForm: { body: "" } });
    });

    socket.on("disconnect", () => this.setState({ status: "disconnected" }));
  }

  onChange = (e) => this.setState({ messageForm: { body: e.target.value } });

  submitForm = (e) => {
    e.preventDefault();
    const { body } = this.state.messageForm;
    if (!body) return;
    socket.emit(
      "message",
      ({
        authorId,
        body,
      }: Message)
    );
  };

  render() {
    return (
      <div>
        <Head>
          <title>My page title</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <div>{this.state.status}</div>
        <h1>Hello world!</h1>
        <form onSubmit={this.submitForm} action="">
          <input
            autoFocus
            type="text"
            onChange={this.onChange}
            value={this.state.messageForm.body}
          />
        </form>
        {this.state.messages.map(({ body, authorId }, i) => (
          <li key={i}>
            {authorId}: {body}
          </li>
        ))}
      </div>
    );
  }
}
