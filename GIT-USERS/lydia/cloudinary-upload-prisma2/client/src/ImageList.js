import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

export function ImageList() {
  const [images, setImages] = useState([]);
  const { data } = useQuery(GET_IMAGES);

  useEffect(() => {
    if (data?.images) {
      const baseUrl = `https://res.cloudinary.com/${process.env.CLOUD_NAME}`;
      const images = data.images.map(
        ({ version, publicId, format }) =>
          `${baseUrl}/v${version}/${publicId}.${format}`
      );
      setImages(images);
    }
  }, [data]);

  return images ? (
    images.map(img => <img src={img} key={img.publicId} />)
  ) : (
    <div />
  );
}

const GET_IMAGES = gql`
  query Images {
    images {
      id
      publicId
      format
      version
    }
  }
`;
