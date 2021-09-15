import React from 'react';

const Card = (props) => {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image">
          <img alt="card face" src={props.imgUrl} />
        </figure>
      </div>
      <div className="card-content">
        <div className="content">
          {props.content}
        </div>
      </div>
    </div>
  );
}

export default Card;