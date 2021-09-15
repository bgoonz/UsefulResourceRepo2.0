import React from "react";

interface ChoiceProps {
  image: string;
  name: string;
  chooseOption(e: any): void;
}

export function Choice(props: ChoiceProps) {
  return (
    <div
      className="choice"
      onClick={props.chooseOption}
      data-choice={props.name}
    >
      <img data-choice={props.name} src={props.image} />
      <span data-choice={props.name}>{props.name}</span>
    </div>
  );
}
