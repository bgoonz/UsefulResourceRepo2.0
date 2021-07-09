import './Line.scss';
import React from 'react';

const Line = ({ content }) => (
  <div className="row text-center line">
    <div className="col-md-12 offset-md-1">
      <h2><span>{ content }</span></h2>
    </div>
  </div>
);

export default Line;
