import React from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

class ImageCrop extends React.Component {
  state = {
    crop: {
      unit: "%", // default, can be 'px' or '%'
      x: 0,
      y: 0,
      aspect: 3 / 2,
      width: 100,
    },
  };

  onChange = (crop) => {
    this.setState({ crop });
  };

  render() {
    const { src, onImageLoaded, onCropComplete } = this.props;
    const { crop } = this.state;
    return (
      <ReactCrop
        src={src}
        crop={crop}
        onImageLoaded={onImageLoaded}
        onComplete={onCropComplete}
        onChange={this.onChange}
      />
    );
  }
}

export default ImageCrop;
