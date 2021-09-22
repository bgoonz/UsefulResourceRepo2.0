import { PURCHASE_CARD } from '../actions/storeActions';

function InventoryReducer(state = {}, action) {
	Object.freeze(state);
	switch (action.type) {
		case PURCHASE_CARD:
			const newState = { ...state };
			newState[action.card.id] -= 1;
			return newState;
		default:
			return state;
	}
}

export default InventoryReducer;
