/**
 * Day 30
 * push notification
 */
'use strict';

import React,{ Component } from 'react';
import { PushNotificationIOS,StyleSheet,Text,TouchableHighlight,View } from 'react-native';
import Util from './utils';

class Button extends Component{
  render() {
    return (
      <TouchableHighlight
        underlayColor={'white'}
        style={[styles.button,{backgroundColor:this.props.color}]}
        onPress={this.props.onPress}>
        <Text style={styles.buttonLabel}>
          {this.props.label}
        </Text>
      </TouchableHighlight>
    );
  }
}

export default class extends Component{
  componentWillMount() {
    PushNotificationIOS.addEventListener('notification', this._onNotification);
  }

  componentWillUnmount() {
    PushNotificationIOS.removeEventListener('notification', this._onNotification);
  }

  _onNotification(notification) {

    PushNotificationIOS.presentLocalNotification({
      alertBody:notification.getMessage(),
    });
    let numOfBadge = PushNotificationIOS.getApplicationIconBadgeNumber((num) => {
      let add = parseInt(notification.getBadgeCount(), 10);
      PushNotificationIOS.setApplicationIconBadgeNumber(num+add);
    });
  
  }

  _sendNotification() {
    require('RCTDeviceEventEmitter').emit('remoteNotificationReceived', {
      aps: {
        alert: 'This is the 30th day of this project',
        badge: '1',
        sound: 'default',
      },
    });
  }

  render() {
    PushNotificationIOS.requestPermissions();
    return (
      <View style={styles.container}>
        <Button
          color="#24bf2f"
          onPress={() => this._sendNotification()}
          label="Send local notification"
        />
        <Button
          color="#F27405"
          onPress={() => PushNotificationIOS.setApplicationIconBadgeNumber(5)}
          label="Set app's icon badge to 5"
        />
        <Button
          color="#15b3e5"
          onPress={() => PushNotificationIOS.setApplicationIconBadgeNumber(0)}
          label="Clear app's icon badge"
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container:{
    paddingTop:80,
    height: Util.size.height,
    width: Util.size.width,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#fff"
  },
  button: {
    padding: 10,
    width: Util.size.width-80,
    height:40,
    borderRadius:5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:20,
  },
  buttonLabel: {
    color: '#fff',
  },
});





