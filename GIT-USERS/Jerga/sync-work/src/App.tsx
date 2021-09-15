import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import { CaptureTimeScreen } from "./screens/CaptureTimeScreen";
import { TabNavigator } from "react-navigation";
import store from "./store";
import { Provider } from "react-redux";

export default class App extends Component {
  render() {
    const MainNavigator = TabNavigator({
      login: { screen: LoginScreen },
      main: {
        screen: TabNavigator({
          time: { screen: CaptureTimeScreen },
        }),
      },
    });

    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
