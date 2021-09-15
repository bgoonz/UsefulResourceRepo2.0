import React from 'react';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import HomeActivityFinderForm from './HomeActivityFinderForm';
import theme from './HomeActivityFinder.scss';

export const HomeActivityFinder = () => (
  <div className={theme.activityFinder}>
    <div className={theme.text}>
      Trouvez des activités qui vous ressemblent
    </div>
    <HomeActivityFinderForm />
  </div>
);

export default compose(
  withStyles(theme),
  pure,
)(HomeActivityFinder);
