import connect from '../connect';
import { hireFarmer, payFarmer } from '../actions/farmersActions';
import FarmerManager from './FarmerManager';

const mapStateToProps = (state) => ({
  farmers: Object.values(state.farmers),
});

const mapDispatchToProps = (dispatch) => ({
  pay: (id) => dispatch(payFarmer(id)),
  hire: (name) => dispatch(hireFarmer(name)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FarmerManager);
