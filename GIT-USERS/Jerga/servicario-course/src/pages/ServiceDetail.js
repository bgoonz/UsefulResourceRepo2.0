import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { fetchServiceById } from "actions";

import Spinner from "components/Spinner";
import OfferModal from "components/service/OfferModal";

const ServiceDetail = (props) => {
  const { serviceId } = useParams();
  const { fetchServiceById, isFetching } = props;

  useEffect(() => {
    fetchServiceById(serviceId);
  }, [serviceId, fetchServiceById]);

  const { service, auth } = props;
  const { user } = service;

  if (isFetching || serviceId !== service.id) {
    return <Spinner />;
  }

  return (
    <section className="hero is-fullheight is-default is-bold service-detail-page">
      <div className="hero-body">
        <div className="container has-text-centered">
          <div className="columns is-vcentered">
            <div className="column is-5">
              <figure className="image is-4by3">
                <img src={service.image} alt="Description" />
              </figure>
            </div>
            <div className="column is-6 is-offset-1">
              <div className="service-header-container">
                <div className="media service-user">
                  <div className="media-left">
                    <figure className="image is-48x48">
                      <img
                        className="is-rounded"
                        src={user.avatar}
                        alt={user.fullName}
                      />
                    </figure>
                  </div>
                  <div className="media-content">
                    <p className="title is-4">{user.fullName}</p>
                    <p className="subtitle is-6">Owner</p>
                  </div>
                </div>
                <div className="service-price">
                  <div className="media service-user">
                    <div className="media-content">
                      <p className="title is-4">${service.price}</p>
                      <p className="subtitle is-6">Per Hour</p>
                    </div>
                  </div>
                </div>
              </div>
              <h1 className="title service-title is-2">{service.title}</h1>
              <div className="tag is-large service-category">
                {service.category}
              </div>
              <h2 className="subtitle is-4">{service.description}</h2>
              <br />
              <div className="has-text-centered">
                {auth.isAuth && auth.user.uid !== service.user.uid && (
                  <OfferModal auth={auth} service={service} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = ({ selectedService, auth }) => ({
  service: selectedService.item,
  isFetching: selectedService.isFetching,
  auth,
});

export default connect(mapStateToProps, { fetchServiceById })(ServiceDetail);
