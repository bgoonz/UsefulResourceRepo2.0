import { UNDO, REDO } from "../actionTypes";

export const undo = () => {
  return { type: UNDO };
};

export const redo = () => {
  return { type: REDO };
};
