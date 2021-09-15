import React, { Component } from "react";
import styled, { css } from "styled-components";
import { Button } from "antd";
import { Link } from "react-router-dom";

const StyledSidebar = styled.div`
  width: 300px;
  background-color: white;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: flex-starts;
  .button {
    margin-bottom: 12px;
  }
`;
export default class Sidebar extends Component {
  render() {
    return (
      <StyledSidebar>
        <div>
          <Link to="/employees">
            <Button type="primary" size="large" block={true} className="button">
              Employees
            </Button>
          </Link>
        </div>
      </StyledSidebar>
    );
  }
}
