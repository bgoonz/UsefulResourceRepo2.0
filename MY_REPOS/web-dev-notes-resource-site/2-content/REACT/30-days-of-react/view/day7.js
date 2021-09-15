/**
 * Day 7
 * Basic pan gesture
 */
'use strict';

import React,{ Component } from 'react';
import { Platform,Image,StyleSheet,StatusBar,Text,TouchableHighlight,PanResponder,View } from 'react-native';
import Util from './utils';
import Icon from 'react-native-vector-icons/Ionicons';

class MoveableCircle extends Component{
  constructor() {
    super();
    this.state = {
      color: "rgba(255,255,255,0.7)",
    };
  }

  _previousLeft = Util.size.width/2-40;
  _previousTop = Util.size.height/2-50;
  _maxTop = Util.size.height-110;
  _maxLeft = Util.size.width-98;
  _circleStyles = {};
  circle = (null : ?{ setNativeProps(props: Object): void });

  _updatePosition() {
    this.circle && this.circle.setNativeProps(this._circleStyles);
  }

  _endMove(evt, gestureState) {
    this._previousLeft += gestureState.dx;
    this._previousTop += gestureState.dy;
    this.setState({
      color: "rgba(255,255,255,0.7)"
    });
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
        onPanResponderGrant: (evt, gestureState) => {
          this.setState({
            color: "white",
          })
        },
        onPanResponderMove: (evt, gestureState) => {
           this._circleStyles.style.left = this._previousLeft + gestureState.dx;
           this._circleStyles.style.top = this._previousTop + gestureState.dy;
           if (this._circleStyles.style.left<0) {
              this._circleStyles.style.left = 0;
           };
           if (this._circleStyles.style.top<5) {
              this._circleStyles.style.top = 5;
           };
           if (this._circleStyles.style.left>this._maxLeft) {
              this._circleStyles.style.left = this._maxLeft;
           };
           if (this._circleStyles.style.top>this._maxTop) {
              this._circleStyles.style.top = this._maxTop;
           };
           this._updatePosition();
        },
        onPanResponderTerminationRequest: (evt, gestureState) => true,
        onPanResponderRelease: (evt, gestureState) => this._endMove(evt, gestureState),
        onPanResponderTerminate: (evt, gestureState) => this._endMove(evt, gestureState),
    });

    this._circleStyles = {
      style: {
        left: this._previousLeft,
        top: this._previousTop,
      },
    };

  }

  componentDidMount() {
    this._updatePosition();
  }

  render() {
    return(
      <View ref={(circle) => {this.circle = circle;}} style={styles.MoveableCircle} {...this._panResponder.panHandlers}>
        <Icon ref="baseball" name="ios-baseball" color={this.state.color} size={120}></Icon>
      </View>
    )
  }
}

export default class extends Component{
  componentWillMount() {
    if(Platform.OS === "ios"){
      StatusBar.setBarStyle(1);
    }
  }

  render() {
    return(
      <View style={styles.container}>
        <Image source={require('./img/agrass.png')} style={styles.bg}></Image>
        <View style={styles.circleContainer}>
          <MoveableCircle></MoveableCircle>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    height:Util.size.height,
    width: Util.size.width
  },
  bg:{
    width: Util.size.width,
    resizeMode:"stretch",
    position:"absolute"
  },
  circleContainer:{
    height:Util.size.height,
    width: Util.size.width,
  },
  MoveableCircle:{
    backgroundColor:"transparent",
    position:"absolute",
    left:0,
    right:0
  },
});