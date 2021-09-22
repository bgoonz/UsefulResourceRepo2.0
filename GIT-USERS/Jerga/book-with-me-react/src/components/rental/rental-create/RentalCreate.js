import React from "react";
import RentalCreateForm from "./RentalCreateForm";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "actions";

export class RentalCreate extends React.Component {
  constructor(props) {
    super(props);
    this.categories = ["apartment", "house", "condo"];

    this.createRental = this.createRental.bind(this);

    this.state = {
      redirect: false,
    };
  }

  createRental(values) {
    this.props.dispatch(actions.createRental(values)).then((res) => {
      if (res && res.rental) this.setState({ redirect: true });
    });
  }

  render() {
    const { errors } = this.props.rentals;

    if (this.state.redirect) {
      return <Redirect to={{ pathname: "/rentals" }} />;
    }
    return (
      <section id="newRental">
        <div className="bwm-form">
          <div className="row">
            <div className="col-md-5">
              <h1 className="page-title">Create Rental</h1>
              <RentalCreateForm
                errors={errors}
                options={this.categories}
                submitCb={this.createRental}
              />
            </div>
            <div className="col-md-6 ml-auto">
              <div className="image-container">
                <h2 className="catchphrase">
                  Hundreds of awesome places in reach of few clicks.
                </h2>
                <img
                  src={process.env.PUBLIC_URL + "/img/create-rental.jpg"}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    rentals: state.rentals,
  };
}

export default connect(mapStateToProps)(RentalCreate);
