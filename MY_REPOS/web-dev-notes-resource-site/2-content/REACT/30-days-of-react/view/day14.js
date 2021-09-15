/**
 * Day 14
 * Tinder Like Swipe
 * know bugs. simg of png win't change no matter how. Other properties changes fine.
 * but changes to gif works fine
 * Maybe bugs internally
 */
'use strict';

import React,{ Component } from 'react';
import { Image,StyleSheet,StatusBar,Text,TouchableHighlight,PanResponder,Animated,LayoutAnimation,View } from 'react-native';
import Util from './utils';
import Icon from 'react-native-vector-icons/Ionicons';
import SwipeCards from 'react-native-swipe-cards';

class Card extends Component{
  static propTypes = {
    top: React.PropTypes.number.isRequired,
    left: React.PropTypes.number.isRequired,
    width: React.PropTypes.number.isRequired,
    img: React.PropTypes.string.isRequired,
  };

  render(){
    return(
      <View style={[styles.card,{top:this.props.top,width:this.props.width,left:this.props.left}]}>
        <Image style={{width:this.props.width-2,height:350}} source={{uri:this.props.img}}></Image>
        <View style={styles.cardInfo}>
          <View>
            <Text style={styles.cardText}>{this.props.name}, very old  <Icon name="ios-checkmark-circle" size={18} color="#208bf6"></Icon></Text>
          </View>
          <View style={styles.cardIcon}>
            <View style={styles.cardIconContainer}>
              <Icon name="ios-people" size={25} color="#fc6b6d"></Icon>
              <Text style={[styles.cardIconText,{color:"#fc6b6d"}]}>0</Text>
            </View>
            <View style={styles.cardIconContainer}>
              <Icon name="ios-book" size={25} color="#cecece"></Icon>
              <Text style={[styles.cardIconText,{color:"#cecece"}]}>0</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

class SCard extends Component{
  static propTypes = {
    id: React.PropTypes.string.isRequired,
    top: React.PropTypes.number.isRequired,
    width: React.PropTypes.number.isRequired,
    img: React.PropTypes.string.isRequired,
  };

  render(){
    return(
      <View key={this.props.id} style={[styles.scard,{top:this.props.top,width:this.props.width}]}>
        <Image style={{width:this.props.width-2,height:350}} source={{uri:this.props.img}}></Image>
        <View style={styles.cardInfo}>
          <View>
            <Text style={styles.cardText}>{this.props.name}, very old  <Icon name="ios-checkmark-circle" size={18} color="#208bf6"></Icon></Text>
          </View>
          <View style={styles.cardIcon}>
            <View style={styles.cardIconContainer}>
              <Icon name="ios-people" size={25} color="#fc6b6d"></Icon>
              <Text style={[styles.cardIconText,{color:"#fc6b6d"}]}>0</Text>
            </View>
            <View style={styles.cardIconContainer}>
              <Icon name="ios-book" size={25} color="#cecece"></Icon>
              <Text style={[styles.cardIconText,{color:"#cecece"}]}>0</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

class SwipeCard extends Component{
  constructor() {
    super();
    const simgs=["minion1","minion2","minion3","minion4","minion5"];
    // const simgs = ["https://media.giphy.com/media/GfXFVHUzjlbOg/giphy.gif","https://media.giphy.com/media/irTuv1L1T34TC/giphy.gif","https://media.giphy.com/media/LkLL0HJerdXMI/giphy.gif","https://media.giphy.com/media/fFBmUMzFL5zRS/giphy.gif","https://media.giphy.com/media/oDLDbBgf0dkis/giphy.gif"];
    const names=["Stuart","Bob","Kevin","Dave","Jerry"];
    const cards = simgs.map(function(elem, index) {
      return {id:"sc"+index,img:simgs[4-index], name:names[4-index], top:13+index*4, width:Util.size.width-22-index*4,}
    })

    this.state = {
      cards,
    };
  }

  handleYup(card) {
    this.props.next();
  }

  handleNope(card) {
    this.props.next()
  }

  render() {
    return (
      <SwipeCards
        cards={this.state.cards}
        renderCard={(cardData) => <SCard key={cardData.id} {...cardData} />}
        handleYup={() => this.handleYup()}
        handleNope={() => this.handleNope()}
        showYup={false}
        showNope={false}
      />
    )
  }
}

class Cards extends Component{
  constructor() {
    super();
    const imgs = ["minion1","minion2","minion3","minion4"];
    const names = ["Stuart","Bob","Kevin","Dave","Jerry"];
    
    this.state = {imgs,names,};
  }
  
  componentDidMount() {
    StatusBar.setBarStyle(0);
  }

  _next() {
    const imgs = this.state.imgs;
    imgs.pop();
    this.setState({imgs,});
  }

  render() {
    const {names,} = this.state;
    const cards = this.state.imgs.map(function(elem, index) {
      return <Card key={index} name={names[index]} img={elem} top={30-index*4} width={Util.size.width-38+index*4} left={18-index*2}></Card>
    });
    return (
      <View>
        {cards}
        <SwipeCard next={() => this._next()}/>
      </View>
    );
  } 
}

export default class extends Component{
  render() {
    return(
      <View style={styles.container}>
        <View style={styles.nav}>
          <Icon name="ios-settings" size={35} color="#cecece"></Icon>
          <Image style={styles.logo} source={{uri:'tinder'}}></Image>
          <Icon name="ios-chatbubbles" size={35} color="#cecece"></Icon>
        </View>
        <View style={styles.actionContainer}>
          <View style={[styles.smallAction,{left:5}]}>
            <Icon name="ios-refresh" color="#fdcd6d" size={30}></Icon>
          </View>
          <View style={styles.largeAction}>
            <Icon name="md-close" color="#fc6c6e" size={45}></Icon>
          </View>
          <View style={styles.largeAction}>
            <Icon name="md-heart" color="#52cb93" size={45}></Icon>
          </View>
          <View style={[styles.smallAction,{right:5}]}>
            <Icon name="ios-pin" color="#318ff6" size={30}></Icon>
          </View>
        </View>
        <Cards/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:"#fff",
    height:Util.size.height,
    width:Util.size.width
  },
  nav:{
    width:Util.size.width,
    flexDirection:"row",
    justifyContent:"space-between",
    height:60,
    paddingTop:20,
    paddingBottom:5,
    paddingLeft:15,
    paddingRight:15,
    backgroundColor:"#fff",
    borderBottomColor:"#ebebeb",
    borderBottomWidth:1
  },
  card:{
    width:Util.size.width-20,
    height:410,
    borderRadius:5,
    borderWidth:1,
    borderColor:"#e1e1e1",
    position:"absolute",
    left:10,
    top:70,
    backgroundColor:"#fff"
  },
  scard:{
    width:Util.size.width-20,
    height:410,
    borderRadius:5,
    borderWidth:1,
    borderColor:"#e1e1e1",
    position:"relative",
    backgroundColor:"#fff",
    top:13
  },
  logo:{
    width:91,
    height:39
  },
  cardInfo:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    height:60,
    paddingLeft:20,
    paddingRight:5
  },
  cardText:{
    fontSize:20,
    fontWeight:"500",
    color:"#423e39"
  },
  cardIcon:{
    flexDirection:"row"
  },
  cardIconContainer:{
    width:50,
    flexDirection:"row",
    alignItems:"center",
  },
  cardIconText:{
    paddingLeft:5,
    fontWeight:"500",
    fontSize:16
  },
  actionContainer:{
    paddingLeft:7.5,
    paddingRight:7.5,
    flexDirection:"row",
    alignItems:"flex-start",
    top: 520,
    position:"absolute",
  },
  smallAction:{
    width: Util.size.width===375?70:60,
    height:Util.size.width===375?70:60,
    borderColor:"#f5f5f5",
    borderWidth:10,
    borderRadius:35,
    alignItems:"center",
    justifyContent:"center",
    position:"relative",
    paddingTop:5
  },
  largeAction:{
    width: Util.size.width===375?110:100,
    height:Util.size.width===375?110:100,
    borderColor:"#f5f5f5",
    borderWidth:10,
    borderRadius:55,
    alignItems:"center",
    justifyContent:"center",
    paddingTop:5
  },
});
