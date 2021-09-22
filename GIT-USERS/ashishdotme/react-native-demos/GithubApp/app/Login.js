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
var buffer = require("buffer");
export default class GithubApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProgress: false,
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require("./../images/Octocat.png")}
        />
        <Text style={styles.heading}>GitHub Browser</Text>
        <TextInput
          onChangeText={(text) => this.setState({ username: text })}
          style={styles.input}
          autoFocus={true}
          keyboardType="email-address"
          placeholder="Github Username"
        />
        <TextInput
          onChangeText={(text) => this.setState({ password: text })}
          style={styles.input}
          secureTextEntry={true}
          placeholder="Github Password"
        />
        <ActivityIndicator animating={this.state.showProgress} size="large" />
        <TouchableHighlight
          style={styles.button}
          onPress={this.onLoginPressed.bind(this)}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
      </View>
    );
  }
  onLoginPressed() {
    console.log(this.state.username + this.state.password);
    this.setState({ showProgress: true });
    var b = new buffer.Buffer(this.state.username + ":" + this.state.password);
    var encodedAuth = b.toString("base64");
    console.log(encodedAuth);
    fetch("https://api.github.com/user", {
      headers: {
        Authorization: "Basic " + encodedAuth,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((results) => {
        this.setState({ showProgress: false });
        console.log(results);
      });
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#CCCCCC",
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
  input: {
    height: 40,
    marginTop: 20,
    borderColor: "#000000",
    borderStyle: "solid",
    //backgroundColor: '#ffffff',
    alignSelf: "stretch",
    paddingLeft: 10,
  },
  button: {
    marginTop: 100,
    backgroundColor: "#3498db",
    height: 40,
    alignSelf: "stretch",
  },
  buttonText: {
    alignSelf: "center",
    marginTop: 5,
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  progress: {
    marginBottom: 10,
  },
});
AppRegistry.registerComponent("GithubApp", () => GithubApp);
