import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Sidebar from "../sidebar/Sidebar";

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f7f8fc;
`;

const ListWrapper = styled.div`
  padding: 15px 30px;
  display: flex;
  flex-grow: 1;
  .bookmarks-list {
    width: 100%;
  }
  .avatar {
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

class Dashboard extends Component {
  componentDidMount() {}

  render() {
    return <div />;
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {})(Dashboard);
