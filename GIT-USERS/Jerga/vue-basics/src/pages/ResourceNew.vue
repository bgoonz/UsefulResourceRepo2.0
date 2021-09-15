<template>
  <resource-form
    :alert="alert"
    :resource="resource"
    @on-form-submit="createResource"
  />
</template>

<script>
import ResourceForm from "@/components/ResourceForm";
import { createResourceApi } from "@/actions";
import alertMixin from "@/mixins/alert";
export default {
  components: { ResourceForm },
  data() {
    return {
      resource: { title: "", description: "", type: "video", link: "" },
    };
  },
  mixins: [alertMixin],
  beforeUnmount() {
    this.clearAlertTimeout();
  },
  methods: {
    async createResource(resource) {
      try {
        await createResourceApi(resource);
        // Todo: redirect to Detail page
        this.$router.push({ name: "resourceHomePage" });
      } catch (errorMessage) {
        this.setAlert("error", errorMessage);
      }
    },
  },
};
</script>
