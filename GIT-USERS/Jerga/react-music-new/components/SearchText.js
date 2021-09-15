import React from "react";
import { Text, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";

export class SearchText extends React.Component {
  constructor() {
    super();

    this.state = {
      value: "",
    };
  }

  componentDidMount() {
    this.input.focus();
  }

  onChange(value) {
    this.setState({ value });
  }

  onSubmitSearch() {
    const { submitSearch } = this.props;

    submitSearch(this.state.value);
  }

  render() {
    return (
      <React.Fragment>
        <Input
          label="Search an Artist"
          ref={(input) => (this.input = input)}
          onChangeText={(event) => this.onChange(event)}
        />
        <Button title="Search" onPress={() => this.onSubmitSearch()} />
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
  },
});
