import { ADD_MEMBER } from "./../actions/dragonActions";

//create our initialState:
export const initialState = {
  members: [
    { name: "Jojo Zhang", dragonStatus: true },
    { name: "Brandon Harris", dragonStatus: false },
  ],
};

//create our reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MEMBER:
      return {
        ...state,
        members: [
          ...state.members,
          { name: action.payload, dragonStatus: false },
        ],
      };
    default:
      return state;
  }
};
//  Add a case ADD_NEW_MEMBER

//Export our reducer
export default reducer;
