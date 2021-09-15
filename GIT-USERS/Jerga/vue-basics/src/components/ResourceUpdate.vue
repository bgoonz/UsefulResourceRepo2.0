<template>
  <div v-if="!resource?._id" class="card">
    <div class="card-body">No Resource is selected :(</div>
  </div>
  <resource-form
    v-else
    :alert="alert"
    :resource="resource"
    @on-form-submit="updateResource"
  />
</template>

<script>
import ResourceForm from "@/components/ResourceForm";
import { updateResourceApi } from "@/actions";
import alertMixin from "@/mixins/alert";
export default {
  components: { ResourceForm },
  props: {
    resource: Object,
  },
  mixins: [alertMixin],
  emits: ["on-resource-update"],
  beforeUnmount() {
    this.clearAlertTimeout();
  },
  watch: {
    resource(newResource, previousResource) {
      if (newResource?._id !== previousResource?._id) {
        this.clearAlertTimeout();
        this.alert = this.initAlert();
      }
    },
  },
  methods: {
    async updateResource(resource) {
      try {
        const updatedResource = await updateResourceApi(resource._id, resource);
        this.$emit("on-resource-update", updatedResource);
        this.setAlert("success", "Resource was updated!");
      } catch (errorMessage) {
        this.setAlert("error", errorMessage);
      }
    },
  },
};
</script>
