import "./chat.scss";

import React, { Component, PropTypes } from "react";
import { TextInput } from "./controls";

export default class Chat extends Component {
  static propTypes = {
    messages: PropTypes.array.isRequired,
    opSendMessage: PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this._lastIndex = -1;
    this._sendMessage = (e) => {
      const { opSendMessage, sendMessage } = this.props;
      e.preventDefault();

      if (!opSendMessage.can) {
        return;
      }

      const message = this._text.value.trim();
      if (message.length === 0) {
        return;
      }

      sendMessage(message);
      this._text.value = "";
    };
  }

  componentDidUpdate() {
    const { messages } = this.props;

    if (messages.length == 0) {
      return;
    }

    const newIndex = messages[messages.length - 1].index;
    if (this._lastIndex == newIndex) {
      return;
    }

    this._messages.scrollTop = this._messages.scrollHeight;
    this._lastIndex = newIndex;
  }

  render() {
    const { messages, opSendMessage } = this.props;

    return (
      <section className="c-chat">
        <ul className="messages" ref={(c) => (this._messages = c)}>
          {messages.map((message) => (
            <li key={message.index}>
              <span className="author">{message.name} </span>
              <span className="message">{message.message} </span>
            </li>
          ))}
        </ul>
        <form onSubmit={this._sendMessage}>
          <TextInput
            className="top-border"
            placeholder={
              opSendMessage.can ? "enter a message" : "please login to chat"
            }
            ref={(c) => (this._text = c)}
            disabled={!opSendMessage.can}
          />
        </form>
      </section>
    );
  }
}
