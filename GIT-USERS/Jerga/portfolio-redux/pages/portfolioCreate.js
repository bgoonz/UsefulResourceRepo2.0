import React from "react";
import BaseLayout from "../components/BaseLayout.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PortfolioCreateForm from "../components/portfolio/PortfolioForm";
import Cookie from "js-cookie";
import { connect } from "react-redux";
import withAuth from "../components/hoc/withAuth";

import * as actions from "../actions";

class PortfolioCreate extends React.Component {
  constructor() {
    super();

    this.state = {
      errors: [],
    };

    this.createPortfolio = this.createPortfolio.bind(this);
  }

  createPortfolio(rentalData) {
    const user = JSON.parse(Cookie.get("user"));

    if (user) rentalData.userId = user.sub;

    actions.createPortfolio(rentalData).then(
      (portfolio) => {},
      (errors) => this.setState({ errors })
    );
  }

  render() {
    return (
      <BaseLayout>
        <section className="portfolioCreate-page">
          <div className="container">
            <h1 className="portfolio-page-title">NEW PORTFOLIO</h1>
            <div className="row">
              <div className="col-md-6">
                <PortfolioCreateForm
                  submitCb={this.createPortfolio}
                  errors={this.state.errors}
                />
              </div>
            </div>
          </div>
        </section>
      </BaseLayout>
    );
  }
}

export default withAuth(PortfolioCreate);
