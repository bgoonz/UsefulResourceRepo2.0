import React from "react";
import withAuthorization from "components/hoc/withAuthorization";
import ServiceItem from "components/service/ServiceItem";
import { connect } from "react-redux";
import Spinner from "components/Spinner";

import { fetchUserServices } from "actions";

class UserServices extends React.Component {
  componentDidMount() {
    const {
      auth: { user },
      dispatch,
    } = this.props;
    dispatch(fetchUserServices(user.uid));
  }

  render() {
    const { services } = this.props.auth.user;
    const { isFetching } = this.props;

    if (isFetching) {
      return <Spinner />;
    }

    return (
      <div className="container">
        <div className="content-wrapper">
          <h1 className="title">Your Services</h1>
          <div className="columns is-multiline">
            {services.map((s) => (
              <div key={s.id} className="column">
                <ServiceItem service={s} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ services }) => ({
  isFetching: services.isFetching,
});

export default withAuthorization(connect(mapStateToProps)(UserServices));
