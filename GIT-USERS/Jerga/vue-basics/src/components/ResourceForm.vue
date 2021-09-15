<template>
  <form @submit.prevent="submitForm">
    <div v-if="alert?.success" class="alert alert-success">
      {{ alert.success }}
    </div>
    <div v-if="alert?.error" class="alert alert-danger">
      {{ alert.error }}
    </div>
    <div class="mb-3">
      <label htmlFor="firstName">Title</label>
      <input
        v-model="uResource.title"
        type="text"
        class="form-control"
        id="title"
        placeholder="How to survice in mountains"
      />
    </div>
    <div class="mb-3">
      <label for="description">Description</label>
      <textarea
        v-model="uResource.description"
        class="form-control"
        id="description"
        placeholder="Just some description"
      ></textarea>
    </div>
    <div class="mb-3">
      <label htmlFor="link">Resource Link</label>
      <div class="input-group">
        <input
          v-model="uResource.link"
          type="text"
          class="form-control"
          id="link"
          placeholder="Username"
        />
      </div>
    </div>
    <div class="mb-3">
      <label htmlFor="link">Type</label>
      <select class="form-control" id="link" v-model="uResource.type">
        <option
          v-for="resourceType in types"
          :key="resourceType"
          :value="resourceType"
        >
          {{ resourceType }}
        </option>
      </select>
    </div>
    <hr class="mb-4" />
    <button class="btn btn-primary btn-lg btn-block" type="submit">
      Submit
    </button>
  </form>
</template>

<script>
export default {
  props: {
    resource: Object,
    alert: Object,
  },
  data() {
    return {
      uResource: { ...this.resource },
      types: ["blog", "video", "book"],
    };
  },
  emits: ["on-form-submit"],
  watch: {
    resource(newResource) {
      this.uResource = { ...newResource };
    },
  },
  methods: {
    submitForm() {
      this.$emit("on-form-submit", this.uResource);
    },
  },
};
</script>
