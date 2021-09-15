import { connect } from "react-redux";
import Cookies from "js-cookie";

import Profile from "./Profile";

const mapStateToProps = ({ currentUser: { currentUser, isLoading } }) => ({
  currentUser,
  isLoading,
  isLoggedIn: !!Cookies.get("authExpiresAt"),
});

export default connect(mapStateToProps)(Profile);
