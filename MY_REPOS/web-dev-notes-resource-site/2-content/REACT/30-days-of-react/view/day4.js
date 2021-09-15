/**
 * Day 4
 * bridge to cocoapods
 */
'use strict';

import React,{ Component } from 'react';
import { Image,StyleSheet,TouchableHighlight,View } from 'react-native';


export default class extends Component{
  constructor() {
    super();
    this.state = {
      show:false
    };
  }

  _onImgPress() {
    this.setState({
      show:false
    })
    this.setState({
      show:true
    })
  }

  render() {
    return(
      <View style={{marginTop:100, alignItems:"center"}}>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  img:{
    height: 200,
    width: 300
  },
});
