import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/index";
import { types } from "../../actions/types";

class OfferFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filterType: types.FILTER_ADRESS,
      activeInstance: 0,
    };
  }

  setFilterType(filterType) {
    return () => {
      if (filterType === types.FILTER_ADRESS) {
        this.setState({
          activeInstance: 1,
        });
      } else {
        this.setState({
          activeInstance: 0,
        });
      }
      const { dispatch } = this.props;

      dispatch(actions.setFilterType(filterType));
    };
  }

  render() {
    //
    const isActive0 = this.state.activeInstance === 0 ? "active" : "";
    const isActive1 = this.state.activeInstance === 1 ? "active" : "";

    return (
      <div className="filter-content">
        <p>
          {" "}
          <span
            className={isActive0}
            onClick={this.setFilterType(types.FILTER_COMPANY)}
          >
            COMPANY
          </span>{" "}
          |
          <span
            className={isActive1}
            onClick={this.setFilterType(types.FILTER_ADRESS)}
          >
            ADRESS
          </span>
        </p>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    filterType: state.filterType,
  };
})(OfferFilter);
