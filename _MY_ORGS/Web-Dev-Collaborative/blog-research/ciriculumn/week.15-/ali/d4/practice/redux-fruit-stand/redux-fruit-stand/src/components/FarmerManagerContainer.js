import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hireFarmer, payFarmer } from '../actions/farmersActions';
import { getAllFarmers } from '../reducers/farmersSelectors';
import FarmerManager from './FarmerManager';

const FarmerManagerContainer = () => {
  const farmers = useSelector(state => getAllFarmers(state));
  const dispatch = useDispatch();

  return (
    <FarmerManager
      farmers={farmers}
      pay={(id) => dispatch(payFarmer(id))}
      hire = {(name) => dispatch(hireFarmer(name))}
    />
  );
}

export default FarmerManagerContainer;
