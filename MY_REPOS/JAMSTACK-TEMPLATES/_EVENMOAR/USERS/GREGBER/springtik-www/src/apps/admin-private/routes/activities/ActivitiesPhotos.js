import React, {PropTypes, Component} from 'react';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import provide from '~/modules/observo/provide';
import connect from '~/modules/observo/connect';
import Button from '~/modules/components/Button';
import ActivitiesPhotosPicture from './ActivitiesPhotosPicture';
import provideObservables from './ActivitiesPhotos.obs';
import styles from './ActivitiesPhotos.scss';

export class ActivitiesPhotos extends Component {
  static contextTypes = {
    $window: PropTypes.object.isRequired,
  };

  handleClick = () => {
    this.context.$window.cloudinary.openUploadWidget({
      cloud_name: 'springtik',
      upload_preset: 'activities',
    }, (err, res) => {
      if (!err) {
        this.props.onUploadSuccess(res);
      }
    });
  }

  render() {
    const {
      onTrash,
      pictures,
    } = this.props;

    return (
      <div className={styles.activitiesPhotos}>
        <div className={styles.pictures}>
          {
            pictures.map(picture =>
              <ActivitiesPhotosPicture
                key={picture.publicId}
                picture={picture}
                onTrash={onTrash}
              />
            )
          }
        </div>
        <Button type="button" onClick={this.handleClick}>
          Ajouter des photos
        </Button>
      </div>
    );
  }
}

ActivitiesPhotos.propTypes = {
  onTrash: PropTypes.func.isRequired,
  onUploadSuccess: PropTypes.func.isRequired,
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      publicId: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  saveResult: PropTypes.object,
  trashResult: PropTypes.object,
};

export default compose(
  withStyles(styles),
  provide(provideObservables()),
  connect(({
    saveResult$,
    trash$,
    trashResult$,
    uploadSuccess$,
  }) => ({
    onTrash: trash$,
    onUploadSuccess: uploadSuccess$,
    saveResult: saveResult$,
    trashResult: trashResult$,
  })),
  pure,
)(ActivitiesPhotos);
