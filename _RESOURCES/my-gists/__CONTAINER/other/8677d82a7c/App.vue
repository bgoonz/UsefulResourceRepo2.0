<template>
  <view
    class="container"
    :style="{ flex: 1, backgroundColor: 'rebeccapurple', paddingTop: 50 }"
  >
    <text class="text-color-primary">My Vue Native App</text>
    <view :style="{ flex: 1, flexDirection: 'row', justifyContent: 'center' }">
      <Carousel
        :layout="'default'"
        :data="carouselItems"
        :sliderWidth="300"
        :itemWidth="300"
        :onSnapToItem="(index) => (activeIndex = index)"
      >
        <view
          render-prop-fn="renderItem"
          :style="{
            backgroundColor: 'floralwhite',
            borderRadius: 5,
            height: 250,
            padding: 50,
            marginLeft: 25,
            marginRight: 25,
          }"
        >
          <text :style="{ fontSize: 30 }"
            >{{ index }}{{ args.item.title }}</text
          >
          <text>{{ args.item.text }}</text>
        </view>
      </Carousel>
    </view>
  </view>
</template>

<script>
import Vue from "vue-native-core";
import Carousel from "react-native-snap-carousel";
export default {
  components: {
    Carousel,
  },
  data() {
    return {
      activeIndex: 0,
      carouselItems: [
        {
          title: "Item 1",
          text: "Text 1",
        },
        {
          title: "Item 2",
          text: "Text 2",
        },
        {
          title: "Item 3",
          text: "Text 3",
        },
        {
          title: "Item 4",
          text: "Text 4",
        },
        {
          title: "Item 5",
          text: "Text 5",
        },
      ],
    };
  },
};
</script>
<style>
.container {
  background-color: white;
  align-items: center;
  justify-content: center;
  flex: 1;
}
.text-color-primary {
  color: blue;
}
</style>
