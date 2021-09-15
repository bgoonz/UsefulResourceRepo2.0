<template>
  <ul :class="`list-group resource-list mb-3 ${getTheme()}`">
    <li
      v-for="resource in resources"
      :key="resource._id"
      @click="onItemClick(resource)"
      :class="`${activeItemClass(
        resource
      )} list-group-item d-flex justify-content-between lh-condensed resource-list-item`"
    >
      <div>
        <h6 class="my-0">{{ resource.title }}</h6>
        <small class="text-muted">{{ resource.description }}</small>
      </div>
      <span class="text-muted">{{ resource.type }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    resources: {
      type: Array,
      default: () => [],
    },
    activeId: String,
  },
  emit: ["on-item-click"],
  inject: ["getTheme"],
  computed: {
    activeItemClass() {
      return (resource) => (resource._id === this.activeId ? "is-active" : "");
    },
  },
  methods: {
    onItemClick(resource) {
      this.$emit("on-item-click", resource);
    },
  },
};
</script>
<style scoped lang="scss">
.resource-list {
  max-height: 350px;
  overflow-y: auto;

  &.dark {
    color: black;
  }

  &-item {
    cursor: pointer;
    &:hover {
      background-color: #f3f3f3;
    }
  }
}

.is-active {
  background-color: #f3f3f3;
}
</style>
