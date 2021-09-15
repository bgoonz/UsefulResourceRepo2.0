import React, {Component, PropTypes} from 'react';
import pure from 'recompose/pure';
import {clUrl} from '~/modules/cloudinary';

export class CloudinaryImage extends Component {
  static propTypes = {
    publicId: PropTypes.string.isRequired,
    options: PropTypes.string,
  }

  render() {
    const {
      publicId,
      options,
      ...other,
    } = this.props;

    return (
      <img {...other} src={clUrl(publicId, options)} />
    );
  }
}

export default pure(CloudinaryImage);
