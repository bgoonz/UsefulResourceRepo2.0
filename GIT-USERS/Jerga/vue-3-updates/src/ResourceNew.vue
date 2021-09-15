<template>
  <resource-form
    v-model:title="title"
    v-model:description="description"
    v-model:type="type"
    v-model:link="link"
    @on-form-submit="submitForm"
  />
</template>

<script>
import ResourceForm from "@/components/ResourceForm";
export default {
  components: { ResourceForm },
  data() {
    return {
      title: "",
      description: "",
      type: "",
      link: "",
    };
  },
  methods: {
    submitForm() {
      alert(
        `${this.title} - ${this.description} - ${this.type} - ${this.link}`
      );
    },
  },
};
</script>
