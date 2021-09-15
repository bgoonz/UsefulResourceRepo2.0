import React from 'react';
import pure from 'recompose/pure';
import HomeBackground from './HomeBackground';
import HomeActivityFinder from './HomeActivityFinder';

export const Home = () => (
  <div>
    <HomeBackground />
    <HomeActivityFinder />
  </div>
);

export default pure(Home);
