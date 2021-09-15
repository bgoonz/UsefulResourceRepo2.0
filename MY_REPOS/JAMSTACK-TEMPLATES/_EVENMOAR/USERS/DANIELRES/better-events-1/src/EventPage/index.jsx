import { ListGroup } from "react-bootstrap";
import { connect } from "react-redux";
import Link from "redux-first-router-link";
import React from "react";

const EventPage = ({ eventCode, event }) => (
  <div>
    {event && (
      <div>
        <h2>
          {event.name} <small>Event code: {eventCode}</small>
        </h2>

        <ListGroup>
          {event.subjects.map((subject) => (
            <Link
              className="list-group-item"
              key={subject.id}
              to={{
                type: "EVENTSUBJECTPAGE",
                payload: { eventCode, subjectId: subject.id },
              }}
            >
              {subject.name}
            </Link>
          ))}
        </ListGroup>
      </div>
    )}
  </div>
);

const mapState = ({ events, location }) => ({
  event: events.entries[location.payload.eventCode],
  eventCode: location.payload.eventCode,
});

export default connect(mapState)(EventPage);
