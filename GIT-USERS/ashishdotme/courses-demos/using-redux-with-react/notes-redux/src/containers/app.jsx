import { connect } from "react-redux";
import App from "../app.jsx";
//import { getActiveTabId } from '../redux/selectors/tabs.js';

const mapStateToProps = (state) => ({
  activeTabId: state.activeTabId,
});

export default connect(mapStateToProps, null)(App);
