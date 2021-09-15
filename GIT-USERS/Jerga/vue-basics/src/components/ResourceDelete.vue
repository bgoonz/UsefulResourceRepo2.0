<template>
  <button @click="deleteResource" class="btn btn-sm btn-danger">Delete</button>
</template>

<script>
import { deleteResourceApi } from "@/actions";
export default {
  props: {
    activeId: String,
  },
  emits: ["on-resource-delete"],
  methods: {
    async deleteResource() {
      const deletedResource = await deleteResourceApi(this.activeId);
      this.$emit("on-resource-delete", deletedResource);
    },
  },
};
</script>
