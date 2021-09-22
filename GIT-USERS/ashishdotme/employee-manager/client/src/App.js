import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";

import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/layout/Dashboard";
import Employees from "./components/employees/Employees";
import EmployeeAddForm from "./components/employees/EmployeeAddForm";
import styled from "styled-components";
import Sidebar from "./components/sidebar/Sidebar";

import "./App.css";
import store from "./store";

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f7f8fc;
`;

const ListWrapper = styled.div`
  padding: 15px 30px;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`;

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Wrapper>
              <Sidebar />
              <ListWrapper>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/employees" component={Employees} />
                <Route exact path="/add-employee" component={EmployeeAddForm} />
              </ListWrapper>
            </Wrapper>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
