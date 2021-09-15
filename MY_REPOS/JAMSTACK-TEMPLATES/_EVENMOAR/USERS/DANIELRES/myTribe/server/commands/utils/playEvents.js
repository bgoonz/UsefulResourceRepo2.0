import Promise from "bluebird";

import db from "../../db/db";
import playEvent from "./playEvent";

export const playEvents = () =>
  db("events")
    .where({ isPlayed: false })
    .orderBy("createdAt", "asc")
    .then((events) => Promise.all(events.map((event) => playEvent(db, event))));
