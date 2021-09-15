import React, {PropTypes} from 'react';
import ReactSelect from 'react-select';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './styles/select.scss';

export const Select = ({
  addLabelText = 'Ajouter "{label}" ?',
  ...props,
}) => (
  <ReactSelect {...{addLabelText, ...props}} />
);

Select.propTypes = {
  addLabelText: PropTypes.string,
};

export default withStyles(styles)(Select);
