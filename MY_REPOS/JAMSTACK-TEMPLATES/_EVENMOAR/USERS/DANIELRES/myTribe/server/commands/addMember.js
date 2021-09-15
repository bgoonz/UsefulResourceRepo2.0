import addedMember from "./events/addedMember";
import db from "../db/db";
import playEvent from "./utils/playEvent";

export const addMember = (attrs) =>
  db.transaction((tx) =>
    addedMember(tx, attrs)
      .then((event) => playEvent(tx, event))
      .catch((e) => {
        throw new Error(e);
      })
  );
