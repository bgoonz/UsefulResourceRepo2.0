import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  CardHeader,
} from "reactstrap";
import { Link } from "../../routes";
import PortfolioItem from "./PortfolioItem";

export default class PortfolioCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
    };

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  render() {
    const { portfolio } = this.props;
    const { modal } = this.state;

    return (
      <React.Fragment>
        <PortfolioItem
          toggle={this.handleToggle}
          modal={modal}
          portfolio={portfolio}
        >
          {" "}
        </PortfolioItem>
        <span onClick={this.handleToggle}>
          <Card className="portfolio-card">
            <CardHeader className="portfolio-card-header">
              {portfolio.position}
            </CardHeader>
            <CardBody>
              <p className="portfolio-card-city"> {portfolio.location} </p>
              <CardTitle className="portfolio-card-title">
                {portfolio.company}
              </CardTitle>
              <CardText className="portfolio-card-text">
                {portfolio.description}
              </CardText>
              <div className="readMore"> </div>
            </CardBody>
          </Card>
        </span>
      </React.Fragment>
    );
  }
}
