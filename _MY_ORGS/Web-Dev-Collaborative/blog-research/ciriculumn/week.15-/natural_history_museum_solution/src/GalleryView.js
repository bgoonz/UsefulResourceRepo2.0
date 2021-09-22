import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import GalleryObject from './GalleryObject.js';


function GalleryView(props) {
  const params = useParams();
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    async function fetchGallery() {
      const galleryRes = await fetch(`https://data.nhm.ac.uk/api/3/action/package_show?id=${params.id}`);
      const galleryJSON = await galleryRes.json();
      setGallery(galleryJSON.result);
    }
    fetchGallery();
  }, [params])

  return (
    <>
      <h2>{gallery.title}</h2>
      <span>This Gallery is currently {gallery.isopen ? "Open" : "Closed"}</span>
      <ul>
        {gallery.resources && gallery.resources.map((obj) => <GalleryObject key={obj.id} {...obj} />)}
      </ul>
    </>
  );
}


export default GalleryView;