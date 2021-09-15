import { connect } from "react-redux";
import React from "react";
import { sendMessage } from "../io/messages";
import Link from "redux-first-router-link";

const EventSubjectPage = ({
  event,
  eventCode,
  messages,
  onSubmit,
  subject,
}) => (
  <div>
    {subject && (
      <div>
        <h2>
          <small>
            <Link
              to={{
                type: "EVENTPAGE",
                payload: { eventCode },
              }}
            >
              {event.name}
            </Link>
            {" / "}
          </small>

          {subject.name}
        </h2>
        <div>
          {messages
            .filter((m) => m.discussionId === subject.id)
            .map((m) => (
              <li>{m.body}</li>
            ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit({
              body: this.messageInput.value,
              discussionId: subject.id,
            });
            this.messageInput.value = "";
          }}
        >
          <input autoFocus ref={(e) => (this.messageInput = e)} type="text" />

          <button>Send</button>
        </form>
      </div>
    )}
  </div>
);

const mapState = ({ events, location, messages }) => {
  console.log({ messages });
  const { eventCode, subjectId } = location.payload;
  const event = events.entries[eventCode];
  return {
    event,
    eventCode,
    subject: event ? event.subjects.find((s) => s.id === subjectId) : null,
    messages,
  };
};

const mapDispatch = (dispatch, ownProps) => ({
  onSubmit: ({ body, discussionId }) => {
    if (body) sendMessage({ body, discussionId });
  },
});

export default connect(mapState, mapDispatch)(EventSubjectPage);
