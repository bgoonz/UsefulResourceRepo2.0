import "dropzone/dist/dropzone.css";

import Dropzone from "dropzone";
import React from "react";
import { admin } from "api";
import { imageUploadSuccess } from "./bus";

const DEST_FOLDER = "2019-cute-catalog";

export default class ImageUploadDropZone extends React.Component {
  componentDidMount() {
    const { onError, onSuccess } = this.props;
    let backendResponse = {};

    new Dropzone("div#mydropzone", {
      init: function () {
        this.on(
          "addedfile",
          () => this.files.length > 1 && this.removeFile(this.files[0])
        );
        this.on("success", (res) => {
          const { thumbnail, url } = JSON.parse(res.xhr.response);
          imageUploadSuccess({ thumbnail, url });
          onSuccess();
        });
      },
      accept: function (file, done) {
        admin
          .fetchImageUploadEndpointAndSignature({
            filename: file.name,
          })
          .then((res) => {
            backendResponse = res;
            done();
          })
          .catch((e) => {
            onError(e);
            return this.removeAllFiles();
          });
      },
      acceptedFiles: "image/*",
      addRemoveLinks: false,
      autoProcessQueue: () => !!backendResponse.apiKey,
      maxFiles: 1,
      maxFilesize: 10,
      parallelUploads: 1,
      paramName: "image",
      sending: (file, xhr, formData) => {
        formData.append("apiKey", backendResponse.apiKey);
        formData.append("filename", file.name);
        formData.append("folder", DEST_FOLDER);
        formData.append("signature", backendResponse.signature);
        formData.append("timestamp", parseInt(Date.now() / 1000, 10));
      },
      uploadMultiple: false,
      url: () => backendResponse.endpoint,
    });
  }

  render() {
    return <div className="dropzone" id="mydropzone" />;
  }
}
