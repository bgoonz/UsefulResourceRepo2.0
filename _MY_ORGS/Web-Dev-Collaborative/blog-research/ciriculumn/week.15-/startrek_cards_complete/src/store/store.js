import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import InventoryReducer from '../reducers/InventoryReducer';
import DeckReducer from '../reducers/DeckReducer';
import CardReducer from '../reducers/CardReducer';
import preloadedState from './initialState';

let enhancer;
if (process.env.NODE_ENV === 'production') {
	enhancer = applyMiddleware(thunk);
} else {
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const rootReducer = combineReducers({
	inventory: InventoryReducer,
	decks: DeckReducer,
	cards: CardReducer
});

const configureStore = () => {
	return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
