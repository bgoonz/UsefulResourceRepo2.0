import React from "react";
import Card from "./Card";
import { connect } from "react-redux";
import * as actions from "../../actions/index";

class CardList extends React.Component {
  constructor(props) {
    super(props);
  }

  renderCards() {
    const heroes = this.props.heroes;
    if (!heroes) {
      return <h1>Loading</h1>;
    } else {
      return heroes.map((hero) => {
        return (
          <Card
            key={hero._id}
            name={hero.name}
            relationship={hero.relationships}
          ></Card>
        );
      });
    }
  }

  render() {
    return <div className="row">{this.renderCards()}</div>;
  }
}

function mapStateToProps(state) {
  return {
    heroes: state.heroes,
  };
}

export default connect(mapStateToProps)(CardList);
