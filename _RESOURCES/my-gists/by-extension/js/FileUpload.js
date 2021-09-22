import React, { Component } from "react";
import ReactCrop, { makeAspectCrop } from "react-image-crop";
import { toast } from "react-toastify";
import * as actions from "../../../actions";

export const blobToFile = (blob) => {
  return new File([blob], blob.name, { type: blob.type });
};

class BwmFileUpload extends Component {
  constructor() {
    super();

    this.setupReader();

    this.state = {
      selectedFile: undefined,
      imageBase64: "",
      initialImageBase64: "",
      croppedImage: {},
      pending: false,
      status: "INIT",
      crop: {},
    };

    this.onChange = this.onChange.bind(this);
  }

  setupReader() {
    this.reader = new FileReader();

    this.reader.addEventListener("load", (event) => {
      const { initialImageBase64 } = this.state;

      const imageBase64 = event.target.result;

      if (initialImageBase64) {
        this.setState({ imageBase64 });
      } else {
        this.setState({ imageBase64, initialImageBase64: imageBase64 });
      }
    });
  }

  resetToDefaultState(status) {
    this.setState({
      pending: false,
      status,
      selectedFile: undefined,
      croppedImage: {},
      initialImageBase64: "",
      imageBase64: "",
    });
  }

  onChange(event) {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      this.setState({
        selectedFile,
        initialImageBase64: "",
      });
      this.reader.readAsDataURL(selectedFile);
    }
  }

  onCropChange(crop) {
    this.setState({ crop });
  }

  onImageLoaded = (image) => {
    if (image.naturalWidth < 950 && image.naturalHeight < 720) {
      this.resetToDefaultState("INIT");
      toast.error("Minimum width of an image is 950px and height 720px");
      return;
    }

    this.setState({
      crop: makeAspectCrop(
        {
          x: 0,
          y: 0,
          aspect: 16 / 9,
          width: 50,
        },
        image.width / image.height
      ),
    });
  };

  async onCropCompleted(crop, pixelCrop) {
    const { selectedFile, initialImageBase64 } = this.state;

    if (selectedFile && pixelCrop.height > 0 && pixelCrop.width > 0) {
      const img = new Image();
      img.src = initialImageBase64;

      const croppedImage = await getCroppedImg(
        img,
        pixelCrop,
        selectedFile.name
      );
      this.setState({ croppedImage });

      this.reader.readAsDataURL(croppedImage);
    }
  }

  onError(error) {
    this.setState({ pending: false, status: "FAIL" });
  }

  onSuccess(uploadedImage) {
    const {
      input: { onChange },
    } = this.props;

    this.resetToDefaultState("OK");

    onChange(uploadedImage);
  }

  uploadImage() {
    const { croppedImage } = this.state;

    const fileToUpload = blobToFile(croppedImage);
    if (fileToUpload) {
      this.setState({ pending: true, status: "INIT" });
      actions.uploadImage(fileToUpload).then(
        (uploadedImage) => {
          this.onSuccess(uploadedImage);
        },
        (error) => {
          this.onError(error);
        }
      );
    }
  }

  renderSpinningCircle() {
    const { pending } = this.state;

    if (pending) {
      return (
        <div className="img-loading-overlay">
          <div className="img-spinning-circle"></div>
        </div>
      );
    }
  }

  renderImageStatus() {
    const { status } = this.state;

    if (status === "OK") {
      return (
        <div className="alert alert-success">Image Uploaded Successfully!</div>
      );
    }

    if (status === "FAIL") {
      return <div className="alert alert-danger">Image Upload Failed</div>;
    }
  }

  render() {
    const {
      label,
      meta: { touched, error },
    } = this.props;
    const { selectedFile, imageBase64, crop, initialImageBase64 } = this.state;

    return (
      <div className="img-upload-container">
        <label className="img-upload btn btn-bwm">
          <span className="upload-text">Select an image</span>
          <input
            type="file"
            accept=".jpg, .png, .jpeg"
            onChange={this.onChange}
          />
        </label>

        {selectedFile && (
          <button
            className="btn btn-success btn-upload"
            type="button"
            disabled={!selectedFile}
            onClick={() => this.uploadImage()}
          >
            Upload Image
          </button>
        )}

        {initialImageBase64 && (
          <ReactCrop
            src={initialImageBase64}
            crop={crop}
            onChange={(crop) => this.onCropChange(crop)}
            onImageLoaded={(image) => this.onImageLoaded(image)}
            onComplete={(crop, pixelCrop) =>
              this.onCropCompleted(crop, pixelCrop)
            }
          />
        )}

        {touched && error && <div className="alert alert-danger">{error}</div>}
        {imageBase64 && (
          <div className="img-preview-container">
            <div
              className="img-preview"
              style={{ backgroundImage: "url(" + imageBase64 + ")" }}
            ></div>
            {this.renderSpinningCircle()}
          </div>
        )}
        {this.renderImageStatus()}
      </div>
    );
  }
}

export default BwmFileUpload;

function getCroppedImg(image, crop, fileName) {
  const canvas = document.createElement("canvas");
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext("2d");

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  );

  // As Base64 string
  // const base64Image = canvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        blob.name = fileName;
        resolve(blob);
      },
      "image/jpeg",
      1
    );
  });
}
