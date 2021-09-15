import React from "react";
import "../styles/card.scss";

const Card = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "card display-block" : "card display-none";
  return (
    <div className={showHideClassName}>
      <section className="card-main">
        {children}
        <button onClick={handleClose}>X</button>
      </section>
    </div>
  );
};

export default Card;
