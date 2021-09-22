import { connect } from "react-redux";
import Tabs from "../components/tabs/tabs.jsx";
import { setActiveTab } from "../redux/actions/tabs.js";

const mapStateToProps = (state) => ({
  tabs: state.tabs,
  activeTabId: state.activeTabId,
});

const mapDispatchToProps = (dispatch) => ({
  onSetActiveTab: (id) => () => dispatch(setActiveTab(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
