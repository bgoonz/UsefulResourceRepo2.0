<template>
  <ScreenWithDrawer :navigation="navigation" :headerTitle="title">
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
      title: "I AM SCREEN 2",
    };
  },
};
</script>
