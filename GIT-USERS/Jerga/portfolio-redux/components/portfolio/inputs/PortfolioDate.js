import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";

export default class PortfolioDate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: moment(),
      isDateHidden: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    const { onChange } = this.props.input;

    this.setState({
      startDate: date,
    });

    onChange(date);
  }

  toggleDate() {
    const { onChange } = this.props.input;

    this.setState({
      isDateHidden: !this.state.isDateHidden,
    });

    onChange(null);
  }

  render() {
    const { label, componentName } = this.props;
    const { isDateHidden } = this.state;
    const { onChange } = this.props.input;

    return (
      <div className="form-group">
        <label>{label}</label>
        <div className="input-group">
          {!isDateHidden && (
            <DatePicker
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              maxDate={moment()}
              dropdownMode="select"
              selected={this.state.startDate}
              onChange={this.handleChange}
            />
          )}
          {componentName === "endDate" && !isDateHidden && (
            <button onClick={() => this.toggleDate()}>
              {" "}
              Still Working Here{" "}
            </button>
          )}
          {componentName === "endDate" && isDateHidden && (
            <React.Fragment>
              <span style={{ marginRight: "10px" }}>
                <b> Still Working here</b>
              </span>
              <button onClick={() => this.toggleDate()}> Set End Date </button>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}
