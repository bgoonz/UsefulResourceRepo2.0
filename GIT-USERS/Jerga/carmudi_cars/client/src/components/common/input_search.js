import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/index";

class InputSearch extends Component {
  render() {
    var { dispatch, searchText } = this.props;
    return (
      <div className="search__main__base">
        <input
          type="text"
          placeholder="Filter by name"
          ref="searchText"
          value={searchText}
          onChange={() => {
            searchText = this.refs.searchText.value;
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
  };
})(InputSearch);
