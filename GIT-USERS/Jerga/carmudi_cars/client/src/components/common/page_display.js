import React from "react";
import { Component } from "react";
import { connect } from "react-redux";

class PageDisplay extends Component {
  renderPageDisplay() {
    if (this.props.carsCount) {
      var currentPage = this.props.currentPage ? this.props.currentPage : "1";
      var pages = this.countNumOfPages(parseInt(this.props.carsCount));

      return (
        <p>
          Displaying {currentPage} - {pages} of {this.props.carsCount} Results
        </p>
      );
    }
  }

  countNumOfPages(numOfCars) {
    var pages, leftCars;

    pages = Math.floor(numOfCars / 10); // pages
    leftCars = numOfCars % 10; // cars

    if (leftCars !== 0 && leftCars < 10) {
      pages += 1;
    }

    return pages;
  }

  render() {
    return (
      <div className="pagedisplay__main__base">{this.renderPageDisplay()}</div>
    );
  }
}

export default connect((state) => {
  return {
    carsCount: state.carsCount,
    currentPage: state.currentPage,
  };
})(PageDisplay);
