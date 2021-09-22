import { connect } from 'react-redux';
import App from './App';

const mapStateToProps = (state) => {
	return {
		decks: state.decks
	};
};

export default connect(mapStateToProps)(App);
