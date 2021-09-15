import React from "react";
import CreateHero from "./Card_createHero";
import CardList from "./Card_list";

class Cards_main extends React.Component {
  render() {
    return (
      <div>
        <CreateHero />
        <CardList />
      </div>
    );
  }
}

export default Cards_main;
