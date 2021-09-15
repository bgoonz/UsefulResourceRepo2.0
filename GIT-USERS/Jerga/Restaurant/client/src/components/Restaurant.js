import React from "react";
import { connect } from "react-redux";

class Restaurant extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurant: {},
    };
  }

  componentWillMount() {
    var restaurants = this.props.restaurants;
    var id = this.props.params.id;

    restaurants.map((restaurant) => {
      if (restaurant.id == id) {
        this.setState({
          restaurant: restaurant,
        });
      }
    });
  }

  renderDailyAction(daily) {
    return daily.map((food) => {
      var alergensString = food.alergens.join();

      return (
        <div className="food">
          <h3>
            {" "}
            {food.name}
            <span className="food-price">
              {" "}
              {food.weight}g/{food.price}e
            </span>
          </h3>
          <p className="alergens"> Alergens: {alergensString}</p>
          <p>
            <b>Description:</b> {food.description}
          </p>
        </div>
      );
    });
  }

  render() {
    const { name, capacity, wifi, smoking, photoUrl, daily } =
      this.state.restaurant;

    // const { alergens, description, price, weight} = daily;

    return (
      <section className="restaurant-detail-wrapper">
        <header className="restaurant">
          <div className="img-container">
            <img src={photoUrl} />
          </div>
        </header>

        <section>
          <div className="row welcome">
            <h2> {name}</h2>
            <p className="long-copy">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>

          <div className="row content">
            <div className="col span-1-of-3 box">
              <i className="ion-star icon-big"></i>
              <h2>Actions</h2>

              {this.renderDailyAction(daily)}
            </div>
            <div className="col span-1-of-3 box">
              <i className="ion-social-linkedin icon-big"></i>
              <h2>Info</h2>

              <div className="restaurant-info">
                <div className="title">
                  <p>Free space</p> <p className="value">0/{capacity}</p>
                </div>

                <div className="title">
                  <p>WIFI</p> <p className="value">{wifi}</p>
                </div>
                <div className="title">
                  <p>Smoking</p> <p className="value">{smoking}</p>
                </div>
              </div>
            </div>
            <div className="col span-1-of-3 box">
              <i className="ion-map icon-big"></i>
              <h2>Map</h2>
              <p>Location: (soon will be here)</p>
              <a className="btn btn-ghost" href="/campgrounds">
                {" "}
                RESERVE
              </a>
            </div>
          </div>
        </section>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    restaurants: state.restaurants,
  };
}

export default connect(mapStateToProps)(Restaurant);
