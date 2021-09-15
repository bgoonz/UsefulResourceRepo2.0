/**
 * Day 27
 * imessage gradient color
 * demo purpuses only
 * use https://github.com/tstone/Gradient.js to generate more color options
 */
'use strict';

import React,{ Component } from 'react';
import { findNodeHandle,Image,StyleSheet,Text,TouchableHighlight,ScrollView,View } from 'react-native';
import Util from './utils';
import LinearGradient from 'react-native-linear-gradient';
import { UIManager } from 'NativeModules';

export default class extends Component{
  constructor() {
    super();
    this.state = {
      color: [['rgba(32,138,246,0.9)', 'rgba(32,138,246,0.92)', 'rgba(32,138,246,0.95)'],['rgba(32,138,246,0.92)', 'rgba(32,138,246,0.95)', 'rgba(32,138,246,0.98)'],['rgba(32,138,246,0.96)', 'rgba(32,138,246,0.98)', 'rgba(32,138,246,1)']],
      msg:["An iMessage Gradient effect","Color should change by scroll pageY","testing..."],
    }
  }

  _handleScroll = (event) => {
    for (var i = this.state.msg.length-1; i >= 0; i--) {
      this._changeColor(i);
    }
  };

  _changeColor = (index)=> {
    const wHeight = Util.size.height;
    let view = this.refs['msg'+index]; // Where view is a ref obtained through <View ref='ref'/>
    let handle = findNodeHandle(view);
    UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
      let initOpacity = Math.pow((pageY/wHeight),2) + 0.5;
      let colors = ['rgba(32,138,246,'+initOpacity+')', 'rgba(32,138,246,'+(initOpacity+0.05)+')', 'rgba(32,138,246,'+(initOpacity+0.1)+')'];
      let color = this.state.color;
      color[index] = colors;
      this.setState({
        color: color,
      })
    })
  };

  render() {
    const {color,msg} = this.state;
    const total = msg.length;
    const linears = msg.map((elem, index) => {
      return (
          <LinearGradient key={"linear"+index} ref={"msg"+index} colors={color[index]} style={[styles.linearGradient,{top:Util.size.height-30-(total-index)*50}]}>
            <Text style={styles.text}>{elem}</Text>
          </LinearGradient>
      );
    })
    return(
      <ScrollView style={styles.container} onScroll={this._handleScroll} scrollEventThrottle={16} >
        <View style={{height:2*Util.size.height}}>
          {linears}
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:"#ffffff",
  },
  linearGradient: {
    // width:90,s
    height: 26,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 13,
    alignItems:"center",
    justifyContent: "center",
    position:"absolute",
    right:10,
  },
  text:{
    color:"#fff",
    backgroundColor:"transparent",
  }
});

