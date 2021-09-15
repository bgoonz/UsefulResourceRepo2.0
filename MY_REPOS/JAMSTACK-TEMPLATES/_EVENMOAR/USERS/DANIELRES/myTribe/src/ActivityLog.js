import { connectLean } from "lean-redux";
import React, { Component } from "react";
import noCase from "no-case";
import styled from "styled-components";

import Entry from "./shared/Entry";
import LinkTo from "./shared/LinkTo";
import PageTitle from "./shared/PageTitle";
import formatDate, { fromNow } from "./shared/formatDate";

const Wrapper = styled.section``;

const LogItem = ({ item }) => {
  const author = item.addedBy || "Admin";

  const DateLine = () => (
    <div>
      <small title={formatDate(item.createdAt)}>
        {fromNow(item.createdAt)}
      </small>
    </div>
  );

  switch (item.type) {
    case "addedMember":
      return (
        <div>
          <DateLine />
          {author} {noCase(item.type)} {item.attrs.displayName}
        </div>
      );
    default:
      return (
        <div>
          <DateLine />
          {author} {item.type}
        </div>
      );
  }
};

class Logentries extends Component {
  componentDidMount() {
    const { fetchLogentries } = this.props;
    fetchLogentries();
  }

  render() {
    const { entries } = this.props;

    return (
      <Wrapper>
        <PageTitle>Activity</PageTitle>

        <div className="entries">
          {entries &&
            entries.map((entry) => (
              <LinkTo key={entry.id} target={entry.url}>
                <Entry>
                  <LogItem item={entry} />
                </Entry>
              </LinkTo>
            ))}
        </div>
      </Wrapper>
    );
  }
}

const Connected = connectLean({
  getInitialState() {
    return { entries: [] };
  },

  fetchLogentries() {
    fetch("/api/log")
      .then((res) => res.json())
      .then((entries) => this.setState({ entries }));
  },
})(Logentries);

export default Connected;
