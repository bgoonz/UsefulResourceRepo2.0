import * as api from "api";

export * from "./services";
export * from "./auth";
export * from "./offers";
export * from "./collaborations";
export * from "./connection";

export const createRef = (collection, docId) =>
  api.createRef(collection, docId);
