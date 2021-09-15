<template>
  <ScreenWithDrawer :navigation="navigation">
    <view>
      <text class="text-color-primary">{{ title }}</text>
    </view>
  </ScreenWithDrawer>
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
      title: "I AM SCREEN 3",
    };
  },
};
</script>
