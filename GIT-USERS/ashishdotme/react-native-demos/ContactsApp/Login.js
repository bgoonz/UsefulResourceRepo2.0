"use strict";

import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      final: "",
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}> First Assignment </Text>
        <TextInput
          onChangeText={(text) => this.setState({ name: text })}
          style={styles.input}
          autoFocus={true}
          returnKeyType="next"
          onSubmitEditing={() => this._focusNextField("2")}
          keyboardType="email-address"
          placeholder="Name"
        />
        <TextInput
          ref="2"
          onChangeText={(text) => this.setState({ mobile: text })}
          style={styles.input}
          returnKeyType="done"
          keyboardType="number-pad"
          placeholder="Mobile"
        />

        <TouchableHighlight
          style={styles.button}
          onPress={this.onAddPressed.bind(this)}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableHighlight>
        <Text style={styles.contact}> Contact </Text>
        <Text style={styles.heading}> {this.state.final} </Text>
      </View>
    );
  }

  onAddPressed() {
    var contactInfo = this.state.name + ":" + this.state.mobile;
    this.setState({ final: contactInfo });
  }

  _focusNextField(nextField) {
    this.refs[nextField].focus();
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#B2DFDB",
    borderColor: "#000000",
    borderStyle: "solid",
    borderWidth: 1,
    flex: 1,
    paddingTop: 100,
    alignItems: "center",
    padding: 30,
  },
  logo: {
    width: 66,
    height: 55,
  },
  heading: {
    fontSize: 30,
  },
  contact: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 30,
  },
  input: {
    height: 40,
    marginTop: 20,
    borderColor: "#000000",
    borderStyle: "solid",
    backgroundColor: "#ffffff",
    paddingLeft: 10,
  },
  button: {
    height: 50,
    backgroundColor: "#26A69A",
    alignSelf: "stretch",
    marginTop: 20,
    justifyContent: "center",
    borderStyle: "solid",
    borderWidth: 1,
  },
  buttonText: {
    alignSelf: "center",
    fontSize: 22,
    fontWeight: "bold",
  },

  progress: {
    marginTop: 20,
  },
});

module.exports = Login;
