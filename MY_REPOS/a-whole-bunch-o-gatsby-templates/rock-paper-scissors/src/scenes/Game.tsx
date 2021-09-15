import React from "react";

import { Choice } from "../components/Choice";
import RockIcon from "../svg/rock.svg";
import PaperIcon from "../svg/paper.svg";
import ScissorsIcon from "../svg/scissors.svg";

interface GameSceneProps {
  chooseOption(e: Event): void;
}

export function Game(props: GameSceneProps) {
  return (
    <div>
      <h2>Feeling Lucky? Take Your Pick!</h2>
      <div className="choices">
        <Choice
          image={RockIcon}
          name="Rock"
          chooseOption={props.chooseOption}
        />
        <Choice
          image={PaperIcon}
          name="Paper"
          chooseOption={props.chooseOption}
        />
        <Choice
          image={ScissorsIcon}
          name="Scissors"
          chooseOption={props.chooseOption}
        />
      </div>
    </div>
  );
}
