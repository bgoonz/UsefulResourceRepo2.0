/**
 * Ashish Patel
 * https://ashish.me
 * ashishsushilpatel@gmail.com
 */

import React, { Component } from "react";
import { AppRegistry, Text, StyleSheet, View, ListView } from "react-native";

var Login = require("./Login");

export default class ContactsApp extends Component {
  render() {
    return <Login />;
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 80,
    textAlign: "center",
  },
  contact: {
    fontSize: 25,
  },
});

AppRegistry.registerComponent("ContactsApp", () => ContactsApp);
