import React from "react";
import { connect } from "react-redux";
import { getMessages } from "reducers";
import { markMessageAsRead } from "actions";
import { useHistory } from "react-router-dom";

const ReceivedMessages = ({ dispatch, messages }) => {
  const history = useHistory();

  const handleMessageAsRead = (message) => {
    markMessageAsRead(message);
  };

  const goToCollaboration = (message) => {
    markMessageAsRead(message);
    history.push(message.cta);
  };

  const renderMessages = (messages) => {
    const filteredMessages = messages
      .filter((m) => !m.isRead)
      .map((message) => (
        <div key={message.id}>
          <div className="from-user">
            <span>From: </span>
            {message.fromUser.name}
          </div>
          <hr />
          <div className="navbar-item navbar-item-message">
            <div>{message.text}</div>
            <div onClick={() => goToCollaboration(message)}>
              <div className="button is-success">Join</div>
            </div>
            <button
              onClick={() => handleMessageAsRead(message)}
              className="button is-warning"
            >
              Later
            </button>
          </div>
        </div>
      ));

    if (filteredMessages.length === 0) {
      return <div className="navbar-item">No Messages :(</div>;
    }

    return filteredMessages;
  };

  return renderMessages(messages);
};

const mapStateToProps = (state) => ({ messages: getMessages(state) });

export default connect(mapStateToProps)(ReceivedMessages);
