export default (state = "next", action = {}) =>
  action &&
  action.meta &&
  action.meta.location &&
  action.meta.location.kind === "pop"
    ? "back"
    : "next";
