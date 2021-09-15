import React from "react";

const Card = ({ imgUrl, content }) => {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image">
          <img alt="card face" src={imgUrl} />{" "}
        </figure>{" "}
      </div>{" "}
      <div className="card-content">
        <div className="content"> {content} </div>{" "}
      </div>{" "}
    </div>
  );
};

export default Card;
