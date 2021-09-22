import React from "react";
import RentalForm from "components/forms/RentalForm";
import { createRental } from "actions";
import { Redirect } from "react-router-dom";

class RentalNew extends React.Component {
  state = {
    shouldRedirect: false,
  };

  handleRentalCreate = (rentalData) => {
    createRental(rentalData)
      .then((_) => this.setState({ shouldRedirect: true }))
      .catch((_) => console.log("Errors"));
  };

  render() {
    const { shouldRedirect } = this.state;

    if (shouldRedirect) {
      return <Redirect to={{ pathname: "/" }} />;
    }

    return (
      <section id="newRental">
        <div className="bwm-form">
          <div className="row">
            <div className="col-md-5">
              <h1 className="page-title">Create Rental</h1>
              <RentalForm onSubmit={this.handleRentalCreate} />
              {/* <div>
                <p>
                  Some Errors
                </p>
              </div> */}
            </div>
            <div className="col-md-6 ml-auto">
              <div className="image-container">
                <h2 className="catchphrase">
                  Hundreds of awesome places in reach of few clicks.
                </h2>
                <img src="/images/create-rental.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default RentalNew;
