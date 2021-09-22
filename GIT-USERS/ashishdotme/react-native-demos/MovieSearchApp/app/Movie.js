import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  ActivityIndicator,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";

import { StackNavigator } from "react-navigation";

import MovieDetail from "./MovieDetail";

class SearchMovie extends Component {
  static propTypes = {
    navigation: React.PropTypes.object.isRequired,
  };

  static navigationOptions = {
    title: "Movies",
    header: {
      style: {
        backgroundColor: "#1a91cb",
      },
      tintColor: "white",
    },
  };

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      showProgress: false,
      dataSource: ds.cloneWithRows([]),
      loaded: false,
    };
    this.searchMovies = this.searchMovies.bind(this);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Search Movies</Text>
        <TextInput
          style={styles.searchInput}
          onChangeText={(text) => this.setState({ searchText: text })}
          placeholder="Enter search keyword"
          onSubmitEditing={this.searchMovies}
        />
        {this.state.loaded && (
          <ListView
            enableEmptySections
            dataSource={this.state.dataSource}
            renderRow={(rowData) => (
              <TouchableOpacity
                onPress={() => navigate("Detail", { data: rowData })}
              >
                <View style={styles.imgsList}>
                  <Image
                    source={{
                      uri: rowData.Poster,
                    }}
                    style={styles.img}
                  />
                  <View style={styles.row}>
                    <Text>{rowData.Year}</Text>
                    <Text>{rowData.Language}</Text>
                    <Text style={styles.movieTitle}> {rowData.Title} </Text>
                    <Text>{rowData.Plot}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
        <ActivityIndicator
          style={styles.progress}
          animating={this.state.showProgress}
          size="large"
        />
      </View>
    );
  }

  fetchDescription(data) {
    const moviesArray = [];
    for (let i = 0; i < data.length; i++) {
      const url = `https://www.omdbapi.com/?i=${data[i].imdbID}&plot=short&r=json`;
      fetch(url)
        .then((response) => response.json())
        .then((responseData) => {
          this.setState({ movie: responseData });
          moviesArray.push(this.state.movie);
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(moviesArray),
          });
        })
        .catch((error) => {
          Alert.alert("Error", error.description);
        })
        .done();
    }
    this.setState({ loaded: true });
    this.setState({ showProgress: false });
  }

  searchMovies() {
    this.setState({ showProgress: true });
    fetch(`https://www.omdbapi.com/?s=${this.state.searchText}`)
      .then((response) => response.json())
      .then((responseData) => {
        this.fetchDescription(responseData.Search);
      })
      .catch((error) => {
        Alert.alert("Error", error);
      })
      .done();
  }
}

const $gray = "#A8A8A8",
  $lightgray = "#D7D7D7",
  $white = "#FFFFFF",
  styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-start",
      marginLeft: 20,
      marginRight: 20,
      marginTop: 20,
    },
    header: {
      fontSize: 24,
      alignSelf: "center",
      marginBottom: 10,
    },
    searchInput: {
      height: 40,
      borderColor: $gray,
      borderWidth: 1,
      paddingLeft: 10,
      marginBottom: 10,
    },
    progress: {
      position: "absolute",
      top: 230,
      left: 120,
      width: 100,
      height: 100,
    },
    imgsList: {
      flex: 1,
      flexDirection: "row",
      padding: 0,
      alignItems: "center",
      borderColor: $lightgray,
      borderBottomWidth: 1,
      backgroundColor: $white,
      paddingTop: 10,
      paddingBottom: 10,
    },
    img: {
      height: 95,
      width: 75,
      borderRadius: 20,
      margin: 20,
    },
    row: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-between",
    },
    movieTitle: {
      fontWeight: "bold",
    },
  }),
  MovieSearchApp = StackNavigator({
    Main: { screen: SearchMovie },
    Detail: { screen: MovieDetail },
  });

AppRegistry.registerComponent("MovieSearchApp", () => MovieSearchApp);
