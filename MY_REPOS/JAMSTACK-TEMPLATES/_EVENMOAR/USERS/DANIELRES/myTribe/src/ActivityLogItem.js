import { connectLean } from "lean-redux";
import { push } from "react-router-redux";
import React, { Component } from "react";
import styled from "styled-components";

import Entry from "./shared/Entry";
import LinkTo from "./shared/LinkTo";
import PageTitle from "./shared/PageTitle";

const Wrapper = styled.section``;

const ObjectView = ({ object }) => (
  <div>
    {object &&
      Object.keys(object).map((key) => (
        <dl key={key}>
          <dt>{key}:</dt>
          <dd>
            {typeof object[key] === "object" ? (
              <ObjectView object={object[key]} />
            ) : (
              object[key]
            )}
          </dd>
        </dl>
      ))}
  </div>
);

class LogItem extends Component {
  componentDidMount() {
    const { fetchitem, id } = this.props;
    fetchitem(id);
  }

  componentDidUpdate(prevProps, prevState) {
    const { fetchItem, id } = this.props;
    if (this.props.id !== prevProps.id) {
      fetchItem(id);
    }
  }

  render() {
    const { handleBackClick, item } = this.props;
    return (
      <Wrapper>
        <PageTitle>
          <span
            onClick={handleBackClick}
            style={{
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Log
          </span>
          {" / "}
          {item.type}
        </PageTitle>

        <LinkTo target={item.attrs.url}>
          <Entry>
            <ObjectView object={item.attrs} />
          </Entry>
        </LinkTo>
      </Wrapper>
    );
  }
}

const Connected = connectLean({
  getInitialState() {
    return { item: { attrs: {} } };
  },

  mapState: (state, ownProps) => ({
    item: state.item,
    id: ownProps.location.pathname.split("/")[2],
  }),

  fetchitem(id) {
    fetch(`/api/log/${id}`)
      .then((res) => res.json())
      .then((item) => this.setState({ item }));
  },

  handleBackClick(path) {
    this.dispatch(push("/"));
  },
})(LogItem);

export default Connected;
