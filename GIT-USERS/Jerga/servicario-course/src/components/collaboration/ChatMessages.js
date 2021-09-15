import React from "react";
import moment from "moment";

const ChatMessages = ({ messages, authUser }) => {
  const renderMessages = (messages, authUser) => {
    if (messages.length > 0) {
      return messages.map((message) => {
        // Message is from currently logged in USER
        if (message.user.uid === authUser.uid) {
          return (
            <div key={message.id} className="viewWrapItemLeft">
              <div className="viewWrapItemLeft3">
                <img
                  src={message.user.avatar}
                  alt="avatar"
                  className="peerAvatarLeft"
                />
                <div className="viewItemLeft">
                  <span className="textContentItem">{message.content}</span>
                </div>
              </div>
              <span className="textTimeLeft">
                {moment(message.timestamp).fromNow()}
              </span>
            </div>
          );
        }

        return (
          <div key={message.id} className="viewWrapItemRight">
            <div className="viewWrapItemRight3">
              <img
                src={message.user.avatar}
                alt="avatar"
                className="peerAvatarLeft"
              />
              <div className="viewItemRight">
                <span className="textContentItem">{message.content}</span>
              </div>
            </div>
            <span className="textTimeLeft">
              {moment(message.timestamp).fromNow()}
            </span>
          </div>
        );
      });
    }

    return null;
  };

  return renderMessages(messages, authUser);
};

export default ChatMessages;
