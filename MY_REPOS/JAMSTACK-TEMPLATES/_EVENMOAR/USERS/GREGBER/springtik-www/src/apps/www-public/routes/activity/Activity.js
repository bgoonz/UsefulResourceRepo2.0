import React, {PropTypes} from 'react';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import classNames from 'classnames';
import universalProvide from '~/modules/observo/universalProvide';
import connect from '~/modules/observo/connect';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import ActivityRedirectHandler from './ActivityRedirectHandler';
import ActivityCover from './ActivityCover';
import ActivityTitle from './ActivityTitle';
import ActivityIntro from './ActivityIntro';
import ActivityText from './ActivityText';
import ActivityMap from './ActivityMap';
import ActivitySidebar from './ActivitySidebar';
import ActivityMain from './ActivityMain';
import ActivityBooking from './ActivityBooking';
import ActivitySiblings from './ActivitySiblings';
import createProvider from './Activity.obs';
import styles from './Activity.scss';

export const Activity = ({
  activity = {},
  pending,
}) => (
  <div className={classNames(styles.activity, {[styles.pending]: pending})}>
    <ActivityRedirectHandler />
    <ActivityCover picture={activity.cover} />
    <div className={styles.wrapper}>
      <ActivityMain>
        <ActivityTitle>
          {activity.name}
        </ActivityTitle>
        <ActivityIntro>
          {activity.description}
        </ActivityIntro>
        <ActivityText>
          {activity.text}
        </ActivityText>
        <ActivityMap position={activity.position} />
      </ActivityMain>
      <ActivitySidebar>
        <ActivityBooking activity={activity} />
        <ActivitySiblings activities={activity.siblings} />
      </ActivitySidebar>
    </div>
  </div>
);

Activity.propTypes = {
  activity: PropTypes.shape({
    name: PropTypes.string,
  }),
  pending: PropTypes.bool.isRequired,
};

export default compose(
  universalProvide(createProvider()),
  connect(({
    activity$,
    pending$,
  }) => ({
    activity: activity$,
    pending: pending$,
  })),
  withStyles(styles),
  pure,
)(Activity);
