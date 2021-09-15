import React from "react";
const titleize = require("titleize");

export class BwmComponent extends React.Component {
  constructor(props) {
    super(props);

    this.numbers = [];
  }

  resolveType(isShared) {
    return isShared ? "shared" : "whole";
  }

  toUpperCase(sentence) {
    return titleize(sentence);
  }
}
