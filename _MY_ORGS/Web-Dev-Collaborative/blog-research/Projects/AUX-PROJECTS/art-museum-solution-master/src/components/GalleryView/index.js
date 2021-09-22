import {useParams} from "react-router-dom";
import ArtImageTile from "../ArtImageTile";
import ArtDescription from "../ArtDescription";

import {Route} from "react-router-dom";

const GalleryView = ({galleries}) => {
    const {galleryId} = useParams();
    const gallery = galleries.find(g => g.id === Number(galleryId));
    return (
        <>
            <h2>{gallery.name}</h2>
            <Route path="/galleries/:galleryId" exact>
                {gallery.objects.map(art => {
                    return (
                        <ArtImageTile art={art}  />
                    );
                })}
            </Route>
            <Route path="/galleries/:galleryId/art/:artId">
                <ArtDescription gallery={gallery} />
            </Route>
        </>
    );
};

export default GalleryView;