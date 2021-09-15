import {
  UPDATE_NAME,
  UPDATE_EMAIL,
  UPDATE_MESSAGE,
} from './constants';

const initialState = {
  name:"",
  email:"",
  message:""
}

const formReducer = (state = initialState, action) =>  {
  switch (action.type) {
    case UPDATE_NAME: {
      //Clone state
      //Modify clone to update name

      //Return clone
      return Object.assign({}, state, { name: action.name } );

    }
    case UPDATE_EMAIL: {
      //Clone state
      //Modify clone to update email
      //Return clone
      return Object.assign({}, state, { email: action.email } );
    }
    case UPDATE_MESSAGE: {
      //Clone state
      //Modify clone to update message
      //Return clone
      return Object.assign({}, state, { message: action.message } );
    }
    default: {
      return state;
    }
  }
}

export default formReducer;
