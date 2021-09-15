import React from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import { ExpoConfigView } from "@expo/samples";

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "app.json",
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <React.Fragment>
        <Button
          title="Navigate to Storage"
          onPress={() => this.props.navigation.navigate("Storage")}
        />
        <ExpoConfigView />
      </React.Fragment>
    );
  }
}
