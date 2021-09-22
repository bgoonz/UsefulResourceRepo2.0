import { connect } from 'react-redux';
import { hireFarmer, payFarmer } from '../actions/farmersActions';
import { getAllFarmers } from '../reducers/farmersSelectors';
import FarmerManager from './FarmerManager';

const mapStateToProps = (state) => ({
  farmers: getAllFarmers(state),
});

const mapDispatchToProps = (dispatch) => ({
  pay: (id) => dispatch(payFarmer(id)),
  hire: (name) => dispatch(hireFarmer(name)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FarmerManager);
