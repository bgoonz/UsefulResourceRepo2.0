import { connect } from 'react-redux';
import {
  addFruit,
  addFruits,
  sellFruit,
  sellOut,
} from '../actions/fruitActions';
import {
  getFruitNames,
  getDistinctFruitNames,
} from '../reducers/fruitSelectors';
import FruitManager from './FruitManager';

const mapStateToProps = (state) => ({
  fruit: getFruitNames(state),
  distinctFruit: getDistinctFruitNames(state),
});

const mapDispatchToProps = (dispatch) => ({
  add: (fruit) => dispatch(addFruit(fruit)),
  addBulk: (fruit) => dispatch(addFruits(fruit)),
  sell: (fruit) => dispatch(sellFruit(fruit)),
  sellAll: () => dispatch(sellOut()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FruitManager);
