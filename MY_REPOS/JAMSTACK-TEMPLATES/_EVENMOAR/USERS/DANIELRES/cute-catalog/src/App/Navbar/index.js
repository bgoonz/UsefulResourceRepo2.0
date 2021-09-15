import { connect } from "react-redux";

import Navbar from "./Navbar";
import { logout } from "store/currentUser/actions";

const mapStateToProps = (state) => ({
  isLoading: state.currentUser.isLoading,
  isLoggedIn: state.currentUser.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  logout: (e) => {
    e.preventDefault();
    dispatch(logout());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
