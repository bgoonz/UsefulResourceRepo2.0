import React, {Component, PropTypes} from 'react';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import CloudinaryImage from '~/modules/ui-components/CloudinaryImage';
import FaTrash from 'react-icons/lib/fa/trash';
import styles from './ActivitiesPhotosPicture.scss';

const OPTIONS = 'dpr_auto,q_auto,f_auto,w_200,c_fit';

export class ActivitiesPhotosPicture extends Component {
  handleTrash = () => {
    this.props.onTrash(this.props.picture);
  };

  render() {
    const {
      picture: {
        publicId,
      },
    } = this.props;

    return (
      <div className={styles.picture}>
        <CloudinaryImage
          key={publicId}
          publicId={publicId}
          options={OPTIONS}
        />
        <FaTrash
          onClick={this.handleTrash}
          className={styles.trashBtn}
        />
      </div>
    );
  }
}

ActivitiesPhotosPicture.propTypes = {
  onTrash: PropTypes.func.isRequired,
  picture: PropTypes.shape({
    publicId: PropTypes.string.isRequired,
  }),
};

export default compose(
  withStyles(styles),
  pure,
)(ActivitiesPhotosPicture);
