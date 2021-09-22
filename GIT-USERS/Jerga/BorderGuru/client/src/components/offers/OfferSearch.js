import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/index";

class OfferSearch extends React.Component {
  render() {
    var { dispatch, searchText } = this.props;

    return (
      <div className="search-box">
        <input
          type="text"
          ref="searchText"
          placeholder="Search"
          value={searchText}
          onChange={() => {
            var searchText = this.refs.searchText.value;
            dispatch(actions.setSearchText(searchText));
          }}
        />
      </div>
    );
  }
}

export default connect((state) => {
  return {
    searchText: state.searchText,
    filterType: state.filterType,
  };
})(OfferSearch);
