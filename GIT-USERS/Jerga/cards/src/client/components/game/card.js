import "./card.scss";

import React from "react";

export default function Card(props) {
  const {
    isSelectable = false,
    onClick,
    type,
    card,
    style = "default",
    canZoom = false,
  } = props;

  const classes = [
    "c-card",
    type,
    card ? "front" : "back",
    `style-${style}`,
    canZoom ? "can-zoom" : "",
    isSelectable ? "is-selectable" : "",
  ];

  const click = () => {
    if (!isSelectable) return;
    onClick(card);
  };

  return (
    <div className={classes.join(" ")} onDoubleClick={click}>
      {!card ? (
        <div className="inner">Cards</div>
      ) : (
        <div className="inner">
          <span className="text"> {card.text}</span>
          <span className="set"> {card.set} </span>
          {!card.whiteCardCount ? null : (
            <span className="white-count">
              pick <span>{card.whiteCardCount}</span>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
