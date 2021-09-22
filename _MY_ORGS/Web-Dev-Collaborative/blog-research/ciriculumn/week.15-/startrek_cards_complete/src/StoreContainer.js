import { connect } from 'react-redux';
import Store from './Store';
import { purchaseCard } from './actions/storeActions';

const mapStateToProps = (state) => {
	return {
		cards: state.cards,
		inventory: state.inventory
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		purchaseCard: (card) => dispatch(purchaseCard(card))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Store);
