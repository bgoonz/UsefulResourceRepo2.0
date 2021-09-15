import React from "react";
import CarsDetail from "./Cars_detail";
import { browserHistory } from "react-router";

class CarsList extends React.Component {
  constructor(props) {
    super(props);
  }

  redirectToSingleView(id) {
    return function () {
      browserHistory.push(`car/${id}`);
    };
  }

  renderCars() {
    return this.props.cars.map((carObj) => {
      return (
        <li key={carObj.id}>
          <CarsDetail
            onClickHandler={this.redirectToSingleView(carObj.id)}
            key={carObj.id}
            image={carObj.thumbnail}
            location={carObj.location}
            price={carObj.price}
            name={carObj.name}
          ></CarsDetail>
        </li>
      );
    });
  }

  render() {
    return <ul>{this.renderCars()}</ul>;
  }
}

export default CarsList;
