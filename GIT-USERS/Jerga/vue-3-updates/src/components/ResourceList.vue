<template>
  <ul :class="`list-group mb-3 resource-list ${theme()}`">
    <li
      v-for="resource in resources"
      :key="resource._id"
      @click="() => emitItem(resource)"
      :class="
        'resource-list-item list-group-item d-flex justify-content-between lh-condensed ' +
        activeClass(resource)
      "
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
      required: true,
    },
    activeId: String,
  },
  emits: ["on-item-click"],
  inject: ["theme"],
  computed: {
    activeClass() {
      return (resource) =>
        this.activeId === resource._id ? "is-active" : "not-active";
    },
  },
  methods: {
    emitItem(item) {
      this.$emit("on-item-click", { ...item });
    },
  },
};
</script>
<style scoped lang="scss">
.resource-list {
  max-height: 350px;
  overflow-y: auto;

  &-item {
    &.is-active {
      background-color: #f3f3f3;
    }
    &:hover {
      cursor: pointer;
      background-color: #f3f3f3;
    }
  }
}

.resource-list.dark {
  color: black;
}
</style>
