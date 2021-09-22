import React from 'react';

function GalleryObject(props) {
  return (
    <li>
      <h3><a href={props.url}>{props.name}</a></h3>
      
      <p>
        Size: {props.size} bytes<br />
        format: {props.format}<br />
        state: {props.state}<br />
      </p>
    </li>
  );
}

export default GalleryObject;