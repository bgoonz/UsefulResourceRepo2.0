import React, { useContext } from "react";

import Parents from "./Parents";
import Siblings from "./Siblings";

export default function FamilyTree(props) {
  return (
    <section className="FamilyTree">
      <h1>{props.family.familyName}</h1>
      <h2>Parents</h2>

      {/* Pass data down as a prop */}
      <Parents family={props.family} />

      <div className="spacer" />
      <h2>Siblings</h2>

      {/* Siblings will consume data from Context using render props */}
      <Siblings family={props.family} />
    </section>
  );
}
