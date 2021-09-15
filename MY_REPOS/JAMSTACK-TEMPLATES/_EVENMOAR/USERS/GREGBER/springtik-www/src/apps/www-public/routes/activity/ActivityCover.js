import React, {PropTypes} from 'react';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {clUrl} from '~/modules/cloudinary';
import styles from './ActivityCover.scss';

const OPTIONS = 'dpr_auto,q_auto,f_auto,w_auto';

export const ActivityCover = ({
  picture,
}) => (
  <div
    className={styles.activityCover}
    style={picture ? {backgroundImage: `url(${clUrl(picture.publicId, OPTIONS)})`} : null}
  />
);

ActivityCover.propTypes = {
  picture: PropTypes.shape({
    publicId: PropTypes.string.isRequired,
  }),
};

export default compose(
  withStyles(styles),
  pure,
)(ActivityCover);
