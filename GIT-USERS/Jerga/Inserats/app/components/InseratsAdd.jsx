import React, { Component } from "react";
var { connect } = require("react-redux");
var actions = require("../actions");
import moment from "moment";

import SelectInput from "./common/SelectInput";

class AddInserat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inserat: {},
      errors: {},
    };
  }

  handleSubmit(e) {
    var { dispatch } = this.props;

    console.log(e);
    e.preventDefault();

    var inserat = {
      name: this.refs.name.value,
      title: this.refs.title.value,
      text: this.refs.description.value,
      url: this.refs.url.value,
      city: this.refs.city.value,
      zipCode: this.refs.zipCode.value,
      telephone: this.refs.telephone.value,
      price: this.refs.price.value,
      createdAt: moment().unix(),
    };

    dispatch(actions.startAddInserat(inserat));
    //add actions and reducers
  }
  render() {
    return (
      <div className="column small-6 ">
        Add inserat
        <div className="row add-inserat">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input type="text" ref="name" placeholder="Your Name?" />
            <input type="text" ref="title" placeholder="Title" />
            <textarea
              rows="4"
              type="text"
              ref="description"
              placeholder="Write Description Here"
            />
            <input type="text" ref="url" placeholder="Photo url" />
            <input type="text" ref="city" placeholder="City" />
            <input type="text" ref="zipCode" placeholder="Zip Code" />
            <input type="text" ref="telephone" placeholder="Telephone Number" />
            <input type="text" ref="price" placeholder="Price" />
            <button className="button expanded">Confirm!</button>
          </form>
        </div>
      </div>
    );
  }
}

export default connect()(AddInserat);
