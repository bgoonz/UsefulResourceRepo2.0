/**
 * Day 28
 * 
 */
'use strict';

import React,{ Component } from 'react';
import { Image,StyleSheet,Text,TouchableHighlight,TouchableWithoutFeedback,LayoutAnimation,ScrollView,CameraRoll,View } from 'react-native';
import Util from './utils';
import Icon from 'react-native-vector-icons/Ionicons';

export default class extends Component{
  constructor() {
    super();
    this.state = {
      images: [],
      widths: [],
      active: false,
      showBtn: false,
      selected: [],
    };
  }

  componentDidMount() {
    const fetchParams = {
      first: 10,
    };
    CameraRoll.getPhotos(fetchParams).done((data) => this.storeImages(data), (err) => this.logImageError(err));
  }

  storeImages(data) {
    const assets = data.edges;
    const images = assets.map((asset) => asset.node.image);
    const widths = [];
    const selected = [];
    for (var i = 0; i < images.length; i++) {
      if (i == images.length - 1) {
        Image.getSize(images[i].uri, (w, h) => {
          widths.push((w/h)*130);
          selected.push(false);
          this.setState({images,widths,selected});
        })         
      }else{
        Image.getSize(images[i].uri, (w, h) => {
          widths.push((w/h)*130);
          selected.push(false);
        })
      }
    }
  }

  logImageError(err) {
    console.log(err);
  }

  _select(index) {
    let {selected} = this.state;
    selected[index] = true;
    this.setState({
      active: true,
      selected,
    });
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }

  _showBtn() {
    this.setState({
      showBtn: true,
    });
  }

  _hideBtn() {
    this.setState({
      showBtn: false,
    });
  }

  render() {
    const {active,selected,widths,showBtn} = this.state;
    return(
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => this._showBtn()}>
          <Image style={styles.bg} source={{uri:"imessage"}}></Image>
        </TouchableWithoutFeedback>
        {showBtn?
        <View style={styles.drop}>
          <View style={[styles.btn,{height:active?315:250,}]}>
            <View style={styles.imgContainer}>
              <ScrollView style={[styles.imgContainer,{height:active? 195:130}]} automaticallyAdjustContentInsets={false} horizontal={true} showsHorizontalScrollIndicator={false} >
                <View style={styles.imgContent}>
                { this.state.images.map((image,index) => {
                    return(
                      <TouchableWithoutFeedback underlayColor="transparent" key={index} onPress = {() => this._select(index)}>
                        <View>
                          <Image style={[styles.image,{height:active? 195:130 ,width:active? widths[index]*1.5:widths[index]}]} source={{ uri: image.uri }}>
                            {active? 
                              (selected[index]? 
                                <Icon style={styles.icon} name="ios-checkmark" color="#0089fa" size={25}></Icon>:
                                <Icon style={styles.icon} name="ios-circle-outline" color="#fff" size={25}></Icon>):
                              <View></View>
                            }
                          </Image>
                        </View>
                      </TouchableWithoutFeedback>
                    )
                  })
                }
                </View>
              </ScrollView>
            </View>
            <View style={[styles.innderBtn,{borderBottomWidth:Util.pixel,borderBottomColor:"#ddd"}]}>
              <Text style={styles.btnText}>Library</Text>
            </View>
            <View style={styles.innderBtn}>
              <Text style={styles.btnText}>Camera</Text>
            </View>
          </View>
          <TouchableHighlight underlayColor="transparent" onPress={() => this._hideBtn()} style={styles.btnContainer}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>Cancle</Text>
            </View>
          </TouchableHighlight>
        </View>:
        <View></View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    height: Util.size.height,
    width: Util.size.width,
    backgroundColor:"#f9f9f9",
  },
  bg:{
    marginTop: 20,
    height: Util.size.height - 20,
    width: Util.size.width,
  },
  btn:{
    width: Util.size.width-20,
    height:50,
    backgroundColor:"#fff",
    borderRadius:10,
    marginTop:5,
    alignItems:"center",
    justifyContent:"center",
    flexDirection:"column",
  },
  imgContainer:{
    flex:3,
    width:Util.size.width-20,
  },
  innderBtn:{
    height:50,
    width:Util.size.width-20,
    alignItems:"center",
    justifyContent:"center",
  },
  btnContainer:{
    backgroundColor:"transparent",
  },
  drop:{
    height: Util.size.height,
    width: Util.size.width,
    backgroundColor:"rgba(0,0,0,0.2)",
    position:"absolute",
    left:0,
    top:0,
    flexDirection:"column",
    justifyContent:"flex-end",
    paddingBottom:10,
    alignItems:"center",
  },
  blur:{
    flex:1,
    height:45,
  },
  btnText:{
    color:"#0089fa",
    fontSize:18,
    fontWeight:"500",
  },
  image:{
    height:140,
    width:100,
    marginRight:5,
    alignItems:"flex-end",
    justifyContent:"flex-end",
    paddingBottom:5,
    paddingRight:10,
  },
  imgContent:{
    height:150,
    paddingTop:5,
    paddingBottom:5,
    paddingLeft:5,
    flexDirection:"row",
    flexWrap:"wrap",
  },
  icon:{
    backgroundColor:"transparent",
  }
});

