import React from "react";
import withAuthorization from "components/hoc/withAuthorization";
import { withToastManager } from "react-toast-notifications";
import ServiceItem from "components/service/ServiceItem";
import { connect } from "react-redux";
import { newMessage, newCollaboration } from "helpers/offers";
import { fetchSentOffers, collaborate } from "actions";

import Spinner from "components/Spinner";

class SentOffers extends React.Component {
  componentDidMount() {
    const { auth } = this.props;
    this.props.dispatch(fetchSentOffers(auth.user.uid));
  }

  createCollaboration = (offer) => {
    const {
      auth: { user },
      toastManager,
    } = this.props;

    const collaboration = newCollaboration({ offer, fromUser: user });
    const message = newMessage({ offer, fromUser: user });

    this.props.collaborate({ collaboration, message }).then((_) =>
      toastManager.add("Collaboration was Created!", {
        appearance: "success",
        autoDismiss: true,
      })
    );
  };

  render() {
    const { offers, isFetching } = this.props;

    if (isFetching) {
      return <Spinner />;
    }

    return (
      <div className="container">
        <div className="content-wrapper">
          <h1 className="title">Sent Offers</h1>
          {!isFetching && offers.length === 0 && (
            <span className="tag is-warning is-large">
              You don't have any send offers :(
            </span>
          )}
          <div className="columns">
            {offers.map((offer) => (
              <div key={offer.id} className="column is-one-third">
                <ServiceItem
                  noButton
                  className="offer-card"
                  service={offer.service}
                >
                  <div className="tag is-large">{offer.status}</div>
                  <hr />
                  <div className="service-offer">
                    <div>
                      <span className="label">To User:</span>{" "}
                      {offer.toUser.fullName}
                    </div>
                    <div>
                      <span className="label">Note:</span> {offer.note}
                    </div>
                    <div>
                      <span className="label">Price:</span> ${offer.price}
                    </div>
                    <div>
                      <span className="label">Time:</span> {offer.time} hours
                    </div>
                  </div>
                  {offer.status === "accepted" && !offer.collaborationCreated && (
                    <div>
                      <hr />
                      <button
                        onClick={() => this.createCollaboration(offer)}
                        className="button is-success"
                      >
                        Collaborate
                      </button>
                    </div>
                  )}
                </ServiceItem>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ offers }) => ({
  offers: offers.sent,
  isFetching: offers.isFetching,
});
const SentOffersWithToast = withToastManager(SentOffers);

export default withAuthorization(
  connect(mapStateToProps, { collaborate })(SentOffersWithToast)
);
