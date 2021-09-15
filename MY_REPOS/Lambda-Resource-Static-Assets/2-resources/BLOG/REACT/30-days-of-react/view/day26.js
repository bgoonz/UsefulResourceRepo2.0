/**
 * Day 26
 * swipe and switch
 */
'use strict';

import React,{ Component } from 'react';
import { Image,StyleSheet,Text,TouchableHighlight,LayoutAnimation,PanResponder,View } from 'react-native';
import Util from './utils';
import Day22 from './day22';
import Day24 from './day24';
import Day20 from './day20';

class Menu extends Component{
  render() {
    return(
      <View style={styles.menuContainer}>
        <TouchableHighlight underlayColor="rgba(255,255,255,0.15)" onPress={() => this.props.getDay(0)}>
          <View style={styles.menu}>
            <Text style={styles.menuText}>Day 22</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight underlayColor="rgba(255,255,255,0.15)"  onPress={() => this.props.getDay(1)}>
          <View style={styles.menu}>
            <Text style={styles.menuText}>Day 24</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight underlayColor="rgba(255,255,255,0.15)"  onPress={() => this.props.getDay(2)}>
          <View style={styles.menu}>
            <Text style={styles.menuText}>Day 20</Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

class Main extends Component{
  _previousLeft = 0;
  _maxLeft = 150;
  _mainStyles = {};
  main = (null : ?{ setNativeProps(props: Object): void });
  // _CustomLayoutLinear = {
  //   duration: 200,
  //   create: {
  //     type: LayoutAnimation.Types.linear,
  //     property: LayoutAnimation.Properties.left,
  //   },
  //   update: {
  //     type: LayoutAnimation.Types.curveEaseInEaseOut,
  //   },
  // };
  _CustomLayoutLinear = LayoutAnimation.Presets.linear;

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // return gestureState.dy/gestureState.dx!=0;
        return true
      },
      onPanResponderGrant: (evt, gestureState) => {
        console.log("1")
      },
      onPanResponderMove: (evt, gestureState) => {
        this._mainStyles.style.left = this._previousLeft + gestureState.dx;
        if (this._mainStyles.style.left > this._maxLeft) {
          this._mainStyles.style.left = this._maxLeft;
        };
        if (this._mainStyles.style.left < 0) {
          this._mainStyles.style.left = 0;
        };
        this._updatePosition();
        LayoutAnimation.configureNext(this._CustomLayoutLinear);
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => this._endMove(evt, gestureState),
      onPanResponderTerminate: (evt, gestureState) => this._endMove(evt, gestureState),
      onShouldBlockNativeResponder: (event, gestureState) => true,
    });

    this._mainStyles = {
      style: {
        left: this._previousLeft,
      },
    };
  }

  _updatePosition() {
    this.main && this.main.setNativeProps(this._mainStyles);
  }

  _endMove(evt,gestureState) {
    if (this._mainStyles.style.left > this._maxLeft/2) {
      this._mainStyles.style.left = this._maxLeft;
    };
    if (this._mainStyles.style.left <= this._maxLeft/2) {
      this._mainStyles.style.left = 0;
    };
    this._updatePosition();
    LayoutAnimation.configureNext(this._CustomLayoutLinear);
  }

  componentWillReceiveProps() {
    this.main.setNativeProps({style:{left:0}});
    this._previousLeft = 0;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  }

  render() {
    const Day = this.props.day;
    return(
      <View ref={(main) => {this.main = main;}} {...this._panResponder.panHandlers} style={styles.main}>
        <Day/>
      </View>
    )
  }
}

export default class extends Component{
  constructor(){
    super();
    this.state = {
      day: Day22,
    };
  }

  _getDay(index) {
    console.log("what")
    let day;
    switch(index){
      case 0:
        day = Day22;
        break;
      case 1:
        day = Day24;
        break;
      case 2:
        day = Day20;
        break;
    }
    this.setState({
      day,
    });
  }

  render() {
    return(
      <View>
        <Menu getDay={(index) => this._getDay(index)}/>
        <Main day={this.state.day}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  menuContainer:{
    height: Util.size.height,
    width: Util.size.width,
    backgroundColor:"#893D54",
    justifyContent:"center",
  },
  menu:{
    height:50,
    justifyContent:"center",
    width:150,
    borderBottomColor:"#fff",
    borderBottomWidth: Util.pixel,
  },
  menuText:{
    color:"#fff",
    textAlign:"center",
    fontSize:18,
  },
  main:{
    width:Util.size.width,
    height: Util.size.height,
    position:"absolute",
    left:0,
    top:0,
    backgroundColor:"#fff",
  }
});

