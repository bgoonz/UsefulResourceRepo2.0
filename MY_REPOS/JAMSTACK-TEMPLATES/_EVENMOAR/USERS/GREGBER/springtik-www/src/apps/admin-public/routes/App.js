import {PropTypes} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './App.scss';

export const App = ({children}) => children;

App.propTypes = {
  children: PropTypes.node,
};

export default withStyles(styles)(
  ({children}) => children
);
