import React from "react";
import { connect } from "react-redux";

class CarsSingleView extends React.Component {
  constructor(props) {
    super(props);
  }

  findCarById() {
    var foundCar = {};

    this.props.carsJson.forEach((car) => {
      if (car.id === this.props.params.id) {
        foundCar = car;
      }
    });

    return foundCar;
  }

  limitDescription(text, limit) {
    var shorText;
    if (text.length > limit) {
      shorText = text.substr(0, limit);
    }

    return shorText + "...";
  }

  render() {
    const car = this.findCarById();
    if (Object.keys(car).length == 0) {
      return <h1>Loading</h1>;
    } else {
      return (
        <div className="row">
          <div className="car-singleview__main__base">
            <div className="car-singleview__main__base__header">
              <h2>{car.name}</h2>
            </div>
            <div className="car-singleview__main__base__left">
              <img src={car.main_picture} alt="" />
            </div>
            <div className="car-singleview__main__base__right">
              <div className="car-singleview__main__base__right__price">
                <h2>{car.price}</h2>
              </div>
              <div className="car-singleview__main__base__right__location">
                <p>{car.location}</p>
              </div>
              <div className="car-singleview__main__base__right__description">
                <p>{this.limitDescription(car.description, 200)}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    carsJson: state.carsJson,
  };
}

export default connect(mapStateToProps)(CarsSingleView);
