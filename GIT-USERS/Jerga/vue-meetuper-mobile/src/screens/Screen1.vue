<template>
  <view>
    <text class="text-color-primary">{{ title }}</text>
    <button :title="'Go to Screen2'" :on-press="goToScreen2" />
  </view>
</template>

<script>
export default {
  props: {
    navigation: {
      type: Object,
    },
  },
  data() {
    return {
      title: "I AM SCREEN 1",
    };
  },
  methods: {
    goToScreen2() {
      this.navigation.navigate("Screen2");
    },
  },
};
</script>
