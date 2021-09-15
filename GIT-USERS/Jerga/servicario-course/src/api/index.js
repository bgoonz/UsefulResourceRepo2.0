import db from "db";

export const createRef = (collection, docId) =>
  db.doc(`${collection}/` + docId);

export * from "./services";
export * from "./auth";
export * from "./offers";
export * from "./collaborations";
export * from "./connection";
