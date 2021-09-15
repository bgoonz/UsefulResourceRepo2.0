import React, { PropTypes } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/index";
import { browserHistory } from "react-router";
import { Link } from "react-router";

class RestaurantPage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  renderRestaurants() {
    const { restaurants } = this.props;

    return restaurants.map((restaurant) => {
      return (
        <div className="img-container">
          <li key={restaurant.id}>
            <Link to={`restaurant/${restaurant.id}`}>
              <img src={restaurant.photoUrl} />
            </Link>
            <h2>{restaurant.name}</h2>
          </li>
        </div>
      );
    });
  }

  render() {
    const { restaurants } = this.props;

    return (
      <section className="restaurants">
        <ul>{this.renderRestaurants(restaurants)}</ul>
      </section>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    restaurants: state.restaurants,
  };
}

export default connect(mapStateToProps)(RestaurantPage); // allows use of dispatch
