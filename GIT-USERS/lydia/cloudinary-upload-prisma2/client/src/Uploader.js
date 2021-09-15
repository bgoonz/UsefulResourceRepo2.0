import React, { useCallback } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { useDropzone } from "react-dropzone";

export function Uploader() {
  const [uploadImage] = useMutation(UPLOAD_IMAGE);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const onDrop = useCallback(files => {
    const reader = new FileReader();

    files.forEach(file => {
      reader.readAsDataURL(file);
      reader.onload = () =>
        uploadImage({ variables: { input: { path: reader.result } } });
    });
  }, []);

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Upload</p>
    </div>
  );
}

const UPLOAD_IMAGE = gql`
  mutation UploadImage($input: ImageInput!) {
    uploadImage(input: $input) {
      id
    }
  }
`;
