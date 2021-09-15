/**
 * Day 16
 * Gesture unlock
 * https://github.com/spikef/react-native-gesture-password
 */
'use strict';

import React,{ Component } from 'react';
import { StatusBar,Image,StyleSheet,Text,View } from 'react-native';
import Util from './utils';
import PasswordGesture from 'react-native-gesture-password';

export class EnterPassword extends Component{
  static propTypes = {
    password: React.PropTypes.string.isRequired,
    enterPassword: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      password: this.props.password,
      message: 'Unlock with your password.',
      status: 'normal',
    };
  }

  onEnd(password) {
    if (password == this.state.password) {
      this.setState({
        status: 'right',
        message: 'Password is right, success.'
      });
      this.props.enterPassword();
    } else {
      this.setState({
        status: 'wrong',
        message: 'Password is wrong, try again.'
      });
    }
  }

  onStart() {
    this.setState({
      status: 'normal',
      message: 'Unlock your password.'
    });
  }
  
  render() {
    return (
      <PasswordGesture
        style = {styles.setPg}
        ref='pg'
        status={this.state.status}
        message={this.state.message}
        allowCross={true}
        onStart={() => this.onStart()}
        onEnd={(password) => this.onEnd(password)}
      />
    );
  }
}

class SetPassword extends Component{
  static propTypes = {
    password: React.PropTypes.string.isRequired,
    setPassword: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      password: this.props.password,
      message: 'Please set your password.',
      status: 'normal',
    };
  }
  
  onEnd(password) {
    if ( this.state.password === '' ) {
      this.state.password = password;
      this.setState({
          status: 'normal',
          message: 'Please input your password secondly.',
      });
    } else {
      if ( password === this.state.password ) {
        this.setState({
          status: 'right',
          message: 'Your password is set',
        });
        this.props.setPassword(password);
      } else {
        this.setState({
          status: 'wrong',
          message:  'Not the same, try again.',
        });
      }
    }
  }

  onStart() {
    if ( this.state.password === '') {
      this.setState({
        message: 'Please set your password.',
      });
    } else {
      this.setState({
        message: 'Please input your password secondly.',
      });
    }
  }
  
  render() {
    return (
      <PasswordGesture
        style = {styles.setPg}
        ref='pg'
        status={this.state.status}
        message={this.state.message}
        allowCross={true}
        onStart={() => this.onStart()}
        onEnd={(password) => this.onEnd(password)}
      />
    );
  }
}

export default class extends Component{
  constructor() {
    super();
    this.state = {
      password: '',
      hasSet: false,
      enterApp: false,
    };
  }

  _setPassword(password) {
    this.setState({
      password: password,
      hasSet: true,
    })
  }

  _enterPassword(){
    this.setState({
      enterApp: true,
    });
  }

  componentDidMount() {
    StatusBar.setBarStyle(1);
  }

  render() {
    return(
      <View style={styles.container}>
        {this.state.hasSet?<View></View>:<SetPassword setPassword={(password) => this._setPassword(password)} password={this.state.password}/>}
        {this.state.hasSet&&!this.state.enterApp?<EnterPassword enterPassword={() => this._enterPassword()} password={this.state.password}/>:<View></View>}
        {this.state.enterApp?<View style={styles.app}><Text style={styles.appText}>You are in the app!</Text></View>:<View></View>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:"transparent",
    height: Util.size.height,
    width: Util.size.width,
  },
  setPg:{
    backgroundColor:"#012642",
  },
  app:{
    backgroundColor:"#012642",
    height: Util.size.height,
    width: Util.size.width,
    alignItems:"center",
    justifyContent:"center",
  },
  appText:{
    color:"#fff",
    fontSize:25,
  }
});

