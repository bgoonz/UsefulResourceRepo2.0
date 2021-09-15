<view :style="[styles.imageWrapper]">
    <ImageBackground
               resizeMode='cover'
               :style="styles.backgroundImage"
               :source="{uri: meetup.image}">
    <view :style="[styles.container, {backgroundColor: 'rgba(0,0,0,0.5)', height: '100%'}]">
      <nb-h1 :style="[styles.headerOne, {color: 'white'}]">{{meetup.title}}</nb-h1>
      <nb-thumbnail class="user-image" :source="{uri: meetupCreator.avatar}"/>
      <nb-text :style="[styles.label, {color: 'white'}]">by {{meetupCreator.name}}
      </nb-text>
    </view>
  </ImageBackground>
</view>


backgroundImage: {
   width: '100%',
   height: 180
},
imageWrapper: {
  backgroundColor: 'black'
}
