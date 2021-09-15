import { combineReducers } from "redux";
import {
  SET_COLLABORATION,
  SET_COLLABORATION_JOINED_PEOPLE,
  UPDATE_COLLABORATION_USER,
  SET_COLLABORATION_MESSAGES,
  RESET_COLLABORATION_MESSAGES,
  REMOVE_COLLABORATION_MESSAGE,
} from "types";

const initCollab = () => {
  const collaboration = (state = {}, action) => {
    switch (action.type) {
      case SET_COLLABORATION:
        return action.collaboration;
      default:
        return state;
    }
  };

  const joinedPeople = (state = [], action) => {
    switch (action.type) {
      case SET_COLLABORATION_JOINED_PEOPLE:
        return action.joinedPeople;
      case UPDATE_COLLABORATION_USER:
        const newJoinedPeople = [...state];
        const { user } = action;
        const index = newJoinedPeople.findIndex((jp) => jp.uid === user.uid);

        if (index < 0) {
          return state;
        }
        if (newJoinedPeople[index].state === user.state) {
          return state;
        }

        newJoinedPeople[index].state = user.state;
        return newJoinedPeople;
      default:
        return state;
    }
  };

  const messages = (state = [], action) => {
    switch (action.type) {
      case SET_COLLABORATION_MESSAGES:
        const newMessages = [...state];
        action.messages.forEach((change) => {
          if (change.type === "added") {
            newMessages.push({ id: change.doc.id, ...change.doc.data() });
          }
        });
        return newMessages;
      case REMOVE_COLLABORATION_MESSAGE:
        return state.filter((m) => m.id !== action.messageId);
      case RESET_COLLABORATION_MESSAGES:
        return [];
      default:
        return state;
    }
  };

  return combineReducers({
    joined: collaboration,
    joinedPeople,
    messages,
  });
};

const collaboration = initCollab();
export default collaboration;
