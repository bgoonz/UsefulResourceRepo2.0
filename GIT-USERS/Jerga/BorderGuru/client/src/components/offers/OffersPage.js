import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/index";
import OffersMenu from "./OffersMenu";
import Offer from "./Offer";
import OfferFilter from "./OffersFilter";
import OfferDetail from "./OfferDetail";

import filterAlg from "../../algorithms/index";
import { types } from "../../actions/types";

class OffersPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      offers: [],
      activeOffer: {},
    };
  }

  renderOffers(offers) {
    if (offers) {
      const { filterType, searchText } = this.props;

      var trueFilterType = filterType;

      if (filterType.length === 0) {
        trueFilterType = types.FILTER_COMPANY;
      }

      var filteredOffers = filterAlg.filterOffers(
        offers,
        trueFilterType,
        searchText
      );

      return filteredOffers.map((offer) => {
        return <Offer key={offer._id} offer={offer} />;
      });
    } else {
      return (
        <tr>
          <th>loading</th>
        </tr>
      );
    }
  }

  render() {
    const { offers } = this.props;

    if (offers.data) {
      var mostOrderedItems = filterAlg.filterOffersByOrdes(offers.data);
    }

    return (
      <section className="main-view">
        <div className="row">
          <div className="main-box">
            <OffersMenu />
            <div className="content">
              <div className="content-list col span-1-of-2">
                <OfferFilter />

                <div className="offer">
                  <table>
                    <thead>
                      <tr>
                        <th>Company Name</th>
                        <th>Adress</th>
                        <th>Product</th>
                      </tr>
                    </thead>
                    <tbody>{this.renderOffers(offers.data)}</tbody>
                  </table>
                </div>
              </div>

              <div className="content-detail col span-1-of-2">
                <OfferDetail offers={mostOrderedItems} />
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
    offers: state.offers,
    searchText: state.searchText,
    filterType: state.filterType,
  };
}

export default connect(mapStateToProps)(OffersPage);
