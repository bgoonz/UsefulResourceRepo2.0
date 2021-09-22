import AppDispatcher from "../AppDispatcher";
import { ActionTypes } from "../Constants";

let ServerActions = {
  recieveLinks(links) {
    console.log("2. In serverActions");
    AppDispatcher.dispatch({
      actionType: ActionTypes.RECIEVE_LINKS,
      links,
    });
  },
};

export default ServerActions;
