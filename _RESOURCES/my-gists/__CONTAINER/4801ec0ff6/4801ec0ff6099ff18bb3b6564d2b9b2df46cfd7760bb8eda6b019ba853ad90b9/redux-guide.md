// Step 1: Setup Folders
// Create an actions and a reducers folder. Then add an index.js file in both folders.
// Required dependency installs: axios, redux, react-redux, redux-thunk

************************************************

// Step 2: Create Redux Config File
// @ Root of application create a <config>.js file.

import { createStore } from 'redux';
import reducer from './src/reducers';

const configRedux = () => createStore(reducer);

export default configRedux;

!!-------------------------------!!

// If application requires Asyncronous action creators
import { createStore, applyMiddleware } from 'redux';
import reducer from './src/reducers';
import thunk from 'redux-thunk';

const configRedux = () => createStore(reducer, applyMiddleware(thunk));

export default configRedux;


************************************************

// Step 3: Setup root index.js, or App.js
// Import configRedux() into index.js and wrap <App />

import configRedux from '../configRedux';
import { Provider } from 'react-redux';

const store = configRedux();

// Here you'll wrap App in the ReactDOM render
<Provider store={store}> <App/> </Provider>

// Don't worry... The app is freaking out because we haven't built the reducer yet.

************************************************
	
//  Step 4: Create ../actions/index.js File
// @/actions/index.js
// You'll want to export const any actions then wrap that variable into a function.

export const ACTION_NAME = "ACTION_NAME";

// This is known as the action creator.
export const actionName = payload => ({
	type: ACTION_NAME,
	payload: payload
});

!!-------------------------------!!
// If application requires Asyncronous actions
import axios from 'axios';
export const ACTION_NAME = "ACTION_NAME";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_TOGGLE = "FETCH_TOGGLE";

// This is known as the action creator.
export const actionName = () => dispatch => {
	dispatch({ type: FETCH_TOGGLE });
	axios.get('https://api.kanye.rest/')
		.then(res => dispatch({ type: FETCH_SUCCESS, payload: res.data.quote }))
		.catch(err => dispatch({ type: FETCH_TOGGLE, payload: err }))
};


************************************************

// Step 5: Create a newReducer
// @/reducers/newReducer
// Create a new reducer and import actions from appropriate action file; in this case it's index.js

import { ACTION_NAME } from "../actions/";

const initialState = {
  date: Date.now()
};

const newReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_NAME:
      return {
        ...state,
        date: action.payload
      };
    default:
      return state;
  }
};

export default newReducer;

!!-------------------------------!!
	
// Create a new reducer and import actions from appropriate action file; in this case it's index.js
import { FETCH_TOGGLE, FETCH_SUCCESS } from '../actions/;

const initialState = {
  kanyeism: '',
  error: '',
  isFetching: false
}

const asyncReducer = (state = initialState, action) => {
	switch(action.type){
		case FETCH_TOGGLE:
			return {
				...state,
				isFetching: !state.isFetching,
				error: action.payload ? action.payload : ''
			}
		case FETCH_SUCCESS:
			return {
				...state,
				kanyeism: action.payload,
				isFetching: false,
				error: ''
		default:
				return state;
	}
}
	
export default asyncReducer;


************************************************

// Step 6: Create ../reducers/index.js File

import { combineReducers } from 'redux';
import newReducer from '../reducers/newReducer';
// You'll also need to import any other necessary custom reducers.

export default combineReducers({
	newReducer
	// Include any other reducers required by your application.
});	


************************************************

// Step 7: Consume Data with Hooks
// How to consume the data using hooks within a functional component.

// ! 'RAFC --> Tab' for a new functional component if you're using ES7 extension in VS Code.
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionName } from "../actions/";

const NewComponent = props => {
  const store = useSelector(state => state.newReducer);
  const dispatch = useDispatch();

  return (
    <div>
      <span>{store.date}</span>
      <button onClick={() => dispatch(actionName(`${Date.now()}`))}>
        Change Date
      </button>
    </div>
  );
	// Use this return for an async component
// return (
//     <div>
//       {console.log(store)}
//       <span>{store.kanyeism}</span>
//       <button onClick={() => dispatch(actionName())}>New Kanyeism</button>
//     </div>
//   );
	

};

export default NewComponent;
// Import the NewComponent into the root index.js file. 