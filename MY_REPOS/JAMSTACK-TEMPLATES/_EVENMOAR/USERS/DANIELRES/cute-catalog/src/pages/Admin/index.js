import { connect } from "react-redux";

import Admin from "./Admin";

const mapStateToProps = ({ currentUser: { currentUser } }) => {
  return {
    currentUser,
    isLoading: !currentUser.email,
  };
};

export default connect(mapStateToProps)(Admin);
