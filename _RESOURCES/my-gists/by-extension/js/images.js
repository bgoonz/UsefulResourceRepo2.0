import { useGet } from "restful-react";
import { PageTitle } from "components/shared";

const Images = () => {
  const { data: images, loading } = useGet({
    path: "images",
  });

  const displayImages = () =>
    images.map((image) => (
      <div key={image.cloudinaryId} className="col-md-3">
        <a className="d-block mb-4 h-100" target="_blank" href={image.url}>
          <img className="img-fluid img-thumbnail" src={image.url} />
        </a>
      </div>
    ));

  if (loading) {
    return "Loading images...";
  }

  return (
    <>
      <PageTitle text="Image gallery" />
      <div className="row text-center text-lg-left">
        {images ? displayImages() : "There are no images :("}
      </div>
    </>
  );
};

export default Images;
