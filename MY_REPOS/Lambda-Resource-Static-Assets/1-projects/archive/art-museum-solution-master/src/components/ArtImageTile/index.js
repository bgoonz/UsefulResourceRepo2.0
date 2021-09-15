import { Link, useParams } from "react-router-dom";

import "./style.css";

const ArtImageTile = ({ art }) => {
  const { galleryId } = useParams();
  return (
    <Link className="image-tile" to={`/galleries/${galleryId}/art/${art.id}`}>
      {art.images && art.images.length > 0 ? (
        <img src={art.images[0].baseimageurl} alt={art.title} />
      ) : (
        <h2>{art.title}</h2>
      )}
    </Link>
  );
};

export default ArtImageTile;
