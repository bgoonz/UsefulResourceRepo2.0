<template>
  <view :style="{ padding: 20, backgroundColor: bgColor }">
    <text class="message-text">{{ message }}</text>
  </view>
</template>

<!-- Message Type: ['alert', 'warning', 'primary'] -->
<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
    msgType: {
      type: String,
      default: "primary",
    },
  },
  computed: {
    bgColor() {
      switch (this.msgType) {
        case "primary":
          return "#82acff";
        case "warning":
          return "#ffffb5";
        case "danger":
          return "#e16262";
        default:
          return "white";
      }
    },
  },
};
</script>

<style>
.message-text {
  color: black;
  font-size: 16px;
}
</style>
