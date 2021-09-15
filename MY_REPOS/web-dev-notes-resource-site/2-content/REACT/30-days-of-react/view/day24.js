/**
 * Day 24
 * 
 */
'use strict';

import React,{ Component } from 'react';
import { Image,StyleSheet,Text,TouchableHighlight,TouchableOpacity,StatusBar,Animated,ScrollView,View } from 'react-native';
import Util from './utils';
import Icon from 'react-native-vector-icons/Ionicons';
import ScrollableTabView from 'react-native-scrollable-tab-view';

class HomePage extends Component{
  render() {
    return(
      <ScrollView>
        <Image style={styles.img} source={{uri:"yt1"}}/>
      </ScrollView>
    )
  }
}

class PopularPage extends Component{
  render() {
    return(
      <ScrollView>
        <Image style={styles.img} source={{uri:"yt2"}}/>
      </ScrollView>
    )
  }
}

class SubscribePage extends Component{
  render() {
    return(
      <ScrollView>
        <Image style={styles.img} source={{uri:"yt3"}}/>
      </ScrollView>
    )
  }
}

class MinePage extends Component{
  render() {
    return(
      <ScrollView>
        <Image style={styles.img} source={{uri:"yt4"}}/>
      </ScrollView>
    )
  }
}

var FacebookTabBar = React.createClass({
  selectedTabIcons: [],
  unselectedTabIcons: [],

  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array
  },

  renderTabOption(name, page) {
    var isTabActive = this.props.activeTab === page;

    return (
      <TouchableOpacity key={name} onPress={() => this.props.goToPage(page)} style={styles.tab}>
        <Icon name={name} size={30} color='#fff' style={styles.icon}
              ref={(icon) => { this.selectedTabIcons[page] = icon }}/>
        <Icon name={name} size={30} color='#5b0e0d' style={styles.icon}
              ref={(icon) => { this.unselectedTabIcons[page] = icon }}/>
      </TouchableOpacity>
    );
  },

  componentDidMount() {
    this.setAnimationValue({value: this.props.activeTab});
    this._listener = this.props.scrollValue.addListener(this.setAnimationValue);
  },

  setAnimationValue({value}) {
    var currentPage = this.props.activeTab;

    this.unselectedTabIcons.forEach((icon, i) => {
      var iconRef = icon;

      if (!icon.setNativeProps && icon !== null) {
        iconRef = icon.refs.icon_image
      }

      if (value - i >= 0 && value - i <= 1) {
        iconRef.setNativeProps({ style: {opacity: value - i} });
      }
      if (i - value >= 0 &&  i - value <= 1) {
        iconRef.setNativeProps({ style: {opacity: i - value} });
      }
    });
  },

  render() {
    var containerWidth = this.props.containerWidth;
    var numberOfTabs = this.props.tabs.length;
    var tabUnderlineStyle = {
      position: 'absolute',
      width: containerWidth / numberOfTabs,
      height: 3,
      backgroundColor: '#fff',
      bottom: 0,
    };

    var left = this.props.scrollValue.interpolate({
      inputRange: [0, 1], outputRange: [0, containerWidth / numberOfTabs]
    });

    return (
      <View>
        <View style={[styles.tabs, this.props.style, ]}>
          {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
        </View>
        <Animated.View style={[tabUnderlineStyle, {left}]} />
      </View>
    );
  },
});

export default class extends Component{
  constructor() {
    super();
    this.state = {
      title: "首页",
    };
  }

  componentDidMount() {
    StatusBar.setBarStyle(1);
  }

  _updateTitle(obj) {
    const {i} = obj;
    let title = "";
    switch(i) {
      case 0:
        title = "首页";
        break;
      case 1: 
        title = "时下流行";
        break;
      case 2: 
        title = "订阅";
        break;
      case 3: 
        title = "帐户";
        break;
    }
    this.setState({
      title
    });
  }

  render() {
    return(
      <View>
        <View style={styles.navBg}></View>
        <View style={styles.nav}>
          <Text style={styles.title}>{this.state.title}</Text>
          <View style={styles.iconContainer}>
            <Icon name="ios-search-strong" color="#fff" size={25}/>
            <Icon name="android-more-vertical" color="#fff" size={25}/>
          </View>
        </View>
        <ScrollableTabView 
          onChangeTab={(obj) => this._updateTitle(obj)}
          renderTabBar={() => <FacebookTabBar />}>
          <HomePage tabLabel="android-home" />
          <PopularPage tabLabel="fireball" />
          <SubscribePage tabLabel="ios-albums-outline" />
          <MinePage tabLabel="person" />
        </ScrollableTabView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  navBg:{
    backgroundColor:"#c11f1e",
    width:Util.size.width,
    height:20,
  },
  nav:{
    backgroundColor:"#e32524",
    width:Util.size.width,
    height:55,
    flexDirection:"row",
    justifyContent:"space-between",
    paddingTop:15,
    paddingLeft:20,
    paddingRight:10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  tabs: {
    height: 45,
    flexDirection: 'row',
    paddingTop: 5,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    backgroundColor:"#e32524"
  },
  icon: {
    position: 'absolute',
    top: 0,
    left: 35,
  },
  img: {
    width:375,
    height: 550,
  },
  title:{
    color:"#fff",
    fontSize:20,
  },
  iconContainer:{
    flexDirection:"row",
    justifyContent:"space-between",
    width:60,
  }
});

