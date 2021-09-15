<template>
  <resource-detail :resource="resource">
    <template #buttonLink>
      <button @click="$router.go(-1)" class="btn btn-outline-success">
        Back
      </button>
    </template>
  </resource-detail>
</template>

<script>
import { fetchResourceByIdApi } from "@/actions";
import ResourceDetail from "@/components/ResourceDetail";
export default {
  components: { ResourceDetail },
  data() {
    return {
      resource: null,
    };
  },
  async created() {
    const { id } = this.$route.params;
    this.resource = await fetchResourceByIdApi(id);
  },
};
</script>
