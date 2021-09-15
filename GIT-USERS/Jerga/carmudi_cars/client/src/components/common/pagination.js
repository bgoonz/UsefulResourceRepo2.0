import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/index";
import axios from "axios";
import Scroll from "react-scroll";

class Pagination extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numOfCars: 0,
    };
  }

  componentWillMount() {
    axios.get("/cars/getnumcars").then((resp) => {
      this.setState({
        numOfCars: resp.data,
      });
    });
  }

  onClickHandler(e) {
    e.preventDefault();
    this.setCurrentPage(e.target.value.toString());
    var { dispatch } = this.props;
    dispatch(actions.fetchCarsPartial(e.target.value));
    Scroll.animateScroll.scrollToTop();
  }

  countNumOfPages(numOfCars) {
    var pages, leftCars;
    this.setOveralNumOfCars(numOfCars.toString());

    pages = Math.floor(numOfCars / 10); // pages
    leftCars = numOfCars % 10; // cars

    if (leftCars !== 0 && leftCars < 10) {
      pages += 1;
    }

    return pages;
  }

  setOveralNumOfCars(cars) {
    var { dispatch } = this.props;
    dispatch(actions.setCarCount(cars));
  }

  setCurrentPage(page) {
    var { dispatch } = this.props;
    dispatch(actions.setCurentPage(page));
  }

  renderPagesButtons() {
    var numOfPages = this.countNumOfPages(this.state.numOfCars);
    var pageButtons = [];
    if (numOfPages != 0) {
      for (var i = 0; i < numOfPages; i++) {
        pageButtons.push(
          <input
            key={i}
            type="button"
            value={i + 1}
            onClick={this.onClickHandler.bind(this)}
          />
        );
      }
      return pageButtons;
    }
  }

  render() {
    return (
      <div className="pagination__main__base">{this.renderPagesButtons()}</div>
    );
  }
}

function mapStateToProps(state) {
  return {
    carsJson: state.carsJson,
  };
}

export default connect(mapStateToProps)(Pagination);
