import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";
import { SocialIcon } from "react-native-elements";
import * as actions from "../actions";

class LoginScreen extends Component<any, any> {
  logInWithFB = () => {
    this.props.facebookLogin(() => this.props.navigation.navigate("time"));
  };

  render() {
    return (
      <View style={style.socialContainer}>
        <View style={{ flex: 1 }}>
          <Text style={{ textAlign: "center", fontSize: 24 }}> Welcome</Text>
        </View>
        <View style={{ flex: 2 }}>
          <Text style={{ textAlign: "center" }}>
            {" "}
            Please Login With Selected Provider
          </Text>
          <SocialIcon
            title="Sign In With Facebook"
            button
            onPress={this.logInWithFB}
            type="facebook"
          />
          <SocialIcon title="Sign In With Github" button type="github" />
        </View>
      </View>
    );
  }
}

const style: any = {
  socialContainer: {
    paddingTop: 30,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
};

export default connect(null, actions)(LoginScreen);
