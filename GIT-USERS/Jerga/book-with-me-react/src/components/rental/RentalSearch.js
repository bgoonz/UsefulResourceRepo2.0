import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "actions";

class RentalSearch extends React.Component {
  constructor(props) {
    super(props);

    this.searchInput = React.createRef();
  }

  handleKeyPress(history, event) {
    if (event.key === "Enter") {
      this.handleSearch(history);
    }
  }

  handleSearch(history) {
    const city = this.searchInput.current.value;
    const { dispatch } = this.props;

    if (city) {
      dispatch(actions.fetchRentalsByCity(city));
      history.push(`/rentals/${city}/homes`);
    } else {
      history.push("/rentals");
    }
  }

  render() {
    return (
      <Route
        render={({ history }) => (
          <div className="form-inline my-2 my-lg-0">
            <input
              onKeyPress={(event) => this.handleKeyPress(history, event)}
              ref={this.searchInput}
              className="form-control mr-sm-2 bwm-search"
              type="search"
              placeholder="Try 'New York'"
              aria-label="Search"
            ></input>
            <button
              onClick={() => this.handleSearch(history)}
              className="btn btn-outline-success my-2 my-sm-0 btn-bwm-search"
              type="button"
            >
              Search
            </button>
          </div>
        )}
      ></Route>
    );
  }
}

export default connect()(RentalSearch);
