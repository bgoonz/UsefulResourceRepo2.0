import React from "react";
import { AppRegistry, Text, View, Button } from "react-native";

class Home extends React.Component {
  static navigationOptions = {
    title: "Chat with Lucy",
  };
  render() {
    return (
      <View>
        <Text>Chat with Lucy</Text>
      </View>
    );
  }
}

module.exports = Home;
