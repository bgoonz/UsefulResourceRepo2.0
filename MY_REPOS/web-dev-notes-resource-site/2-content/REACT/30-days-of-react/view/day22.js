/**
 * Day 22
 * 
 */
'use strict';

import React,{ Component } from 'react';
import { Image,StyleSheet,StatusBar,Text,TextInput,TouchableWithoutFeedback,Animated,Easing,View } from 'react-native';
import Util from './utils';
import Icon from 'react-native-vector-icons/Ionicons';

export default class extends Component{
  constructor() {
    super();

    this.state = {
      scale: new Animated.Value(1),
      on: 0,
      scaleOn: 0,
    }
  }
  
  componentDidMount() {
    StatusBar.setBarStyle(0);
  }

  _onMic() {
    this.setState({
      on:1,
    });
    Animated.timing(         
       this.state.scale,    
       {toValue: 20,
        duration: 200,
        easing: Easing.elastic(1),
      },          
    ).start(() => {
      this.setState({
        scaleOn:1,
      });
    });
  }

  _offMic() {
    this.setState({
      scaleOn:0,
    });
    Animated.timing(         
       this.state.scale,    
       {toValue: 1,
        duration: 200,
        easing: Easing.elastic(1),
      },          
    ).start(() => {
      this.setState({
        on:0,
      });
    });
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.nav}>
          <Icon name="ios-settings" size={25} color="#969696"/>
          <Text style={styles.navText}>SIGN IN</Text>
          <Icon name="ios-albums-outline" size={25} color="#969696"/>
        </View>
        <View style={styles.content}>
          <Image source={{uri:"google"}} style={styles.logo}/>
          <View style={styles.btn}>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input}/>
            </View>
          </View>
          <View style={styles.btn}>
            <TouchableWithoutFeedback onPress={() => this._onMic()}>
              <Animated.View style={[styles.btnContent,{transform:[{scale:this.state.scale}]}]}>
                {this.state.on?
                    <View style={[styles.btnContent,{backgroundColor:"#ff3b3e",top:8,transform:[{scale:0.05}]}]}>
                      <Icon name="ios-mic-outline" size={25} color="#fff"/>
                    </View>:
                  <Icon name="ios-mic-outline" size={25} color="#4285f4"/>}
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        {this.state.scaleOn?
          <View style={styles.scaleContainer}>
            <Text style={styles.scaleText}>Speak Now</Text>
            <TouchableWithoutFeedback style={styles.close} onPress={() => this._offMic()}>
              <Icon name="md-close" style={styles.closeIcon} color="#969696" size={25}/>
            </TouchableWithoutFeedback>
          </View>:
          <View></View>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    height:Util.size.height,
    width:Util.size.width,
    paddingTop:30,
    backgroundColor:"#f2f2f2",
  },
  nav:{
    alignItems:"center",
    justifyContent:"space-between",
    height:30,
    flexDirection:"row",
    paddingLeft:25,
    paddingRight:25,
  },
  navText:{
    color:"#969696",
    fontSize:18,
  },
  content:{
    paddingTop: 120,
  },
  logo:{
    height:50,
    resizeMode:"contain"
  },
  btn:{
    width:Util.size.width,
    alignItems:"center",
    justifyContent:"center"
  },
  btnContent:{
    width:50,
    height:50,
    borderRadius:25,
    backgroundColor:"#fff",
    alignItems:"center",
    justifyContent:"center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    }
  },
  input:{
    width: Util.size.width-100,
    height: 40,
    paddingLeft:10,
  },
  inputContainer:{
    width: Util.size.width-80,
    height: 40,
    marginTop:40,
    marginBottom:40,
    backgroundColor:"#fff",
    shadowColor: "#888",
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0,
    }
  },
  scaleText:{
    color:"#969696",
    fontSize:25,
    paddingLeft:25,
    paddingTop:50,
    backgroundColor:"#fff",
  },
  scaleContainer:{
    position: "absolute",
    height:Util.size.height,
    width:Util.size.width,
    top:0,
    left:0,
  },
  closeIcon:{
    height:50,
    width:50,
    position:"absolute",
    bottom: 0,
    left:30,
    backgroundColor:"#fff",
  }
});

