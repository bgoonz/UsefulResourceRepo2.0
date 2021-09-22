import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import GalleryNavigation from './GalleryNavigation.js';
import GalleryView from './GalleryView.js';

function App() {

  const [galleries, setGalleries] = useState([]);

  useEffect(() => {
    async function fetchGalleries() {
      const galleryList = await fetch(`https://data.nhm.ac.uk/api/3/action/package_list`);
      const galleryListJSON = await galleryList.json();
      setGalleries(galleryListJSON.result.slice(0, 10));
    }
    fetchGalleries();
  }, []);


  return (
    <Router>
        <GalleryNavigation galleries={galleries} />
        <Switch>
            <Route path="/" exact>
              <h1>Natural History Museum (London)</h1>
              <p>Please select a Gallery from the navigation bar</p>
            </Route>
            <Route path="/gallery/:id">
              <GalleryView />
            </Route>
        </Switch>
    </Router>

  );
}

export default App;
