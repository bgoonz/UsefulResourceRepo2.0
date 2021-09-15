import React, { Component } from "react";
import { createContainer } from "meteor/react-meteor-data";
import { Links } from "../../import/collections/links";

class LinkList extends Component {
  renderRows() {
    return this.props.links.map((link) => {
      const { url, click, token } = link;
      const shortLink = `http://localhost:3000/${token}`;
      return (
        <tr key={token}>
          <td>{url}</td>
          <td>
            <a href={shortLink}> {shortLink} </a>
          </td>
          <td>{click}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th> URL</th>
            <th>Adress</th>
            <th>Clicks</th>
          </tr>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe("links");
  return { links: Links.find({}).fetch() };
}, LinkList);
