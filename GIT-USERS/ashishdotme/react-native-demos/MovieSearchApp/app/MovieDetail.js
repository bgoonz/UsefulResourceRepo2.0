import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";

class MovieDetail extends Component {
  static propTypes = {
    navigation: React.PropTypes.object.isRequired,
  };

  static navigationOptions = {
    title: "Details",
    header: {
      style: {
        backgroundColor: "#1a91cb",
      },
      tintColor: "white",
    },
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: params.data.Poster }} />
        <ScrollView automaticallyAdjustContentInsets={false}>
          <Text style={styles.heading}>{params.data.Title}</Text>
          <Text style={styles.text}>
            <Text style={styles.boldText}> Released Date </Text> -{" "}
            {params.data.Released}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldText}> Description </Text> -{" "}
            {params.data.Plot}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldText}> Language </Text> -{" "}
            {params.data.Language}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldText}> Actors </Text> - {params.data.Actors}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldText}> Director </Text> -{" "}
            {params.data.Director}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldText}> Runtime </Text> -{" "}
            {params.data.Runtime}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldText}> Rating </Text> -{" "}
            {params.data.imdbRating}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldText}> Awards </Text> - {params.data.Awards}
          </Text>
        </ScrollView>
      </View>
    );
  }
}
let windowSize = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  image: {
    height: windowSize.height / 3,
    alignSelf: "stretch",
    borderRadius: 20,
    margin: 20,
  },
  heading: {
    fontSize: 25,
    marginLeft: 20,
  },
  text: {
    fontSize: 16,
    marginLeft: 20,
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default MovieDetail;
