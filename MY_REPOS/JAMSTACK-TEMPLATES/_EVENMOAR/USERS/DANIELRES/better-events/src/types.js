// @flow

export type Message = { authorId: string, body: string };

export type Action =
  | { type: "POST_MESSAGE_REQUEST" }
  | { type: "POST_MESSAGE_SUCCESS", payload: Message }
  | { type: "POST_MESSAGE_FAILURE", error: string };
