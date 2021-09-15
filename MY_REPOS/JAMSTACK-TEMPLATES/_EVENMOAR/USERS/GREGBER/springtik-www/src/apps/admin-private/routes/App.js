import React, {PropTypes} from 'react';
import compose from 'recompose/compose';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {take} from 'rxjs/operator/take';
import {switchMap} from 'rxjs/operator/switchMap';
import {publishReplay} from 'rxjs/operator/publishReplay';
import api from '~/apps/admin-private/api';
import universalProvide from '~/modules/observo/universalProvide';
import styles from './app.scss';
import Header from '../header/Header';
import Menu from '../menu/Menu';

export const App = ({
  children,
  location,
}) => (
  <div>
    <Header />
    <div id="container">
      <Menu {...{location}} />
      {children}
    </div>
  </div>
);

App.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object,
};

export const getObservables = ({props$}) => ({
  me$: props$
    ::take(1)
    ::switchMap(() => api.me())
    ::publishReplay(1).refCount(),
});

export default compose(
  universalProvide(getObservables),
  withStyles(styles)
)(App);
