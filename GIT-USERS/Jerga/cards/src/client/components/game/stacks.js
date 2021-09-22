import "./stacks.scss";

import React from "react";
import Card from "./card";

import _ from "lodash";

export default function Stacks(props) {
  const { stacks, opSelectStack, selectStack, ourStack, ourStackId } = props;

  return (
    <div className="c-stacks">
      {stacks.map((stack) => {
        const cards = stack.cards
          ? renderVisibleStack(stack, opSelectStack, selectStack)
          : renderHiddenStack(stack.count);

        const classes = [
          "stack",
          stack.isWinner ? "is-winner" : "",
          stack.cards ? "shown" : "hidden",
          stack.id == ourStackId ? "our-stack" : "",
        ];

        return cards.length ? (
          <div key={stack.id} className={classes.join(" ")}>
            {cards}
          </div>
        ) : null;
      })}
    </div>
  );
}

function renderVisibleStack(stack, opSelectStack, selectStack) {
  return stack.cards.map((card, index) => (
    <Card
      key={index}
      isSelectable={opSelectStack.can && !opSelectStack.inProgress}
      onClick={() => selectStack(stack)}
      card={card}
      type="white"
      style="small"
    />
  ));
}

function renderHiddenStack(count) {
  return _.range(0, count).map((index) => (
    <Card key={index} type="white" style="small" />
  ));
}
