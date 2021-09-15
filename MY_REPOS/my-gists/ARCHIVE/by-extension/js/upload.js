import { useState } from "react";
import { useMutate } from "restful-react";
import { PageTitle } from "components/shared";

const Upload = () => {
  const [selectedImage, setSelectedImage] = useState();
  const { mutate: uploadImage } = useMutate({
    verb: "POST",
    path: "image-upload",
  });

  const handleChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleImageUpload = () => {
    if (!selectedImage) {
      return;
    }
    const formData = new FormData();
    formData.append("image", selectedImage);

    uploadImage(formData)
      .then((uploadedImage) => {
        console.log(uploadedImage);
      })
      .catch((_) => {
        console.log("Oooops, something went wrong!");
      });
  };

  return (
    <>
      <PageTitle text="Upload Image" />
      <input
        onChange={handleChange}
        accept=".jpg, .png, .jpeg"
        className="fileInput mb-2"
        type="file"
      ></input>
      <div>
        <button
          onClick={handleImageUpload}
          disabled={!selectedImage}
          className="btn btn-primary mb-2"
        >
          Upload
        </button>
      </div>
    </>
  );
};

export default Upload;
