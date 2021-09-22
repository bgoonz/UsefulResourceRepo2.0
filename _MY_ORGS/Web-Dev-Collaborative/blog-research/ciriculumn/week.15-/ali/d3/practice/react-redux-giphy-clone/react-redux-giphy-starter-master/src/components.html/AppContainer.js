import { connect } from 'react-redux';
import { fetchGifs } from '../actions/gifActions';
import App from './App';

const mapStateToProps = state => {
  return {
    // TODO: Pass `gifs` prop
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // TODO: Pass `fetchGifs` prop
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
