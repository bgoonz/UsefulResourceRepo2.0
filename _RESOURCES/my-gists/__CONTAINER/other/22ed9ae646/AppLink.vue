<template>
  <nuxt-link :to="to" class="nav-link" :class="{ active: isLinkActive }">
    <slot></slot>
  </nuxt-link>
</template>

<script>
export default {
  props: ["to"],
  computed: {
    isLinkActive() {
      const { path } = this.$route;
      if (this.to !== "/") {
        return path.includes(this.to);
      } else {
        return path === this.to;
      }
    },
  },
};
</script>
