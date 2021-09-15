import React, {PropTypes} from 'react';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import Link from 'react-router/lib/Link';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {clUrl} from '~/modules/cloudinary';
import styles from './ActivitySiblings.scss';

const CL_OPTIONS = 'w_320,h_140,c_fit,dpr_auto,q_auto,f_auto';

export const ActivitySiblings = ({
  activities,
}) => (
  <div className={styles.activitySiblings}>
    <h2 className={styles.title}>
      Activités similaires
    </h2>
    {activities && activities.map(
      ({
        id,
        link,
        name,
        cover,
      }) => (
        <Link key={id} to={link}>
          <div
            className={styles.activityBlock}
            style={{backgroundImage: `url(${clUrl(cover.publicId, CL_OPTIONS)})`}}
          >
            <div className={styles.activityTitle}>
              {name}
            </div>
          </div>
        </Link>
      )
    )}
  </div>
);

ActivitySiblings.propTypes = {
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      cover: PropTypes.shape({
        publicId: PropTypes.string.isRequired,
      }).isRequired,
    }),
  ),
};

export default compose(
  withStyles(styles),
  pure,
)(ActivitySiblings);
