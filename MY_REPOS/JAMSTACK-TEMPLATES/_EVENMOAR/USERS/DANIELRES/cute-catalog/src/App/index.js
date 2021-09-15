import { connect } from "react-redux";

import App from "./App";

const mapStateToProps = (state) => ({
  page: state.location.type,
});

export default connect(mapStateToProps)(App);
