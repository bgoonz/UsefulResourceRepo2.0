import React from "react";

class CarsDetail extends React.Component {
  render() {
    const { location, price, name, image } = this.props;

    return (
      <div
        onClick={this.props.onClickHandler}
        className="car-detail__main__base"
      >
        <div className="car-detail__main__base__picture">
          <img src={image} alt="" />
        </div>
        <div className="car-detail__main__base__description">
          <div className="car-detail__main__base__description__name">
            <h2>{name}</h2>{" "}
            <span>
              <h2>{price}</h2>
            </span>
          </div>
          <div className="car-detail__main__base__description__location">
            <p>{location}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default CarsDetail;
