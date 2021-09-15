import React from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
} from "react-native";

import { StackNavigator } from "react-navigation";

var Home = require("./Home");

class Login extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Github</Text>
        <TextInput
          style={styles.username}
          placeholder="Enter Username"
        ></TextInput>
        <TextInput
          style={styles.username}
          placeholder="Enter Username"
        ></TextInput>
        <Button onPress={() => navigate("Home")} title="Login" />
      </View>
    );
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
  header: {
    fontSize: 30,
  },
  username: {
    marginTop: 20,
    paddingLeft: 10,
    backgroundColor: "white",
    width: 200,
    height: 40,
  },
});

const NavigationApp = StackNavigator({
  Login: { screen: Login },
  Home: { screen: Home },
});

AppRegistry.registerComponent("NavigationApp", () => NavigationApp);
