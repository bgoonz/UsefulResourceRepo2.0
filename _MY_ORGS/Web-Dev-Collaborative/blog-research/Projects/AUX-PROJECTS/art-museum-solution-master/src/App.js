import harvardArt from "./data/harvardArt";
import GalleryNavigation from "./components/GalleryNavigation";

import {Route, Switch} from "react-router-dom";
import GalleryView from "./components/GalleryView";

function App() {
  return (
    <div className="page-wrapper">
      <GalleryNavigation galleries={harvardArt.records} />
      <Switch>
        <Route path="/" exact>
          <h2>Harvard Art Museum</h2>
          <p>
            Look, but Don't Touch. Please select a Gallery in the navigation
            bar.
          </p>
        </Route>
        <Route path="/galleries/:galleryId">
          <GalleryView galleries={harvardArt.records} />
        </Route>
        <Route>
          <h2>Page Not Found</h2>
        </Route>
      </Switch>
      
    </div>
  );
}

export default App;
