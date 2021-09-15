<template>
  <form>
    <div class="mb-3">
      <label htmlFor="title">Title</label>
      <input
        :value="title"
        @input="changeTitle($event.target.value)"
        type="text"
        class="form-control"
        id="title"
        placeholder="How to survice in mountains"
      />
    </div>
    <div class="mb-3">
      <label for="description">Description</label>
      <textarea
        :value="description"
        @input="changeDescription($event.target.value)"
        class="form-control"
        id="description"
        placeholder="Just some description"
      >
      </textarea>
    </div>
    <div class="mb-3">
      <label htmlFor="link"
        >Link <span class="text-muted">(Optional)</span></label
      >
      <input
        :value="link"
        @input="changeLink($event.target.value)"
        type="text"
        class="form-control"
        id="link"
        placeholder="Link to resource"
      />
    </div>
    <div class="mb-3">
      <select
        class="form-control"
        name="type"
        :value="type"
        @change="changeType($event.target.value)"
        id="resourceType"
      >
        <option v-for="type in types" :key="type" :value="type">
          {{ type }}
        </option>
      </select>
    </div>
    <hr class="mb-4" />
    <button
      @click="submitForm"
      class="btn btn-primary btn-lg btn-block"
      type="button"
    >
      Submit
    </button>
  </form>
</template>
<script>
export default {
  props: {
    title: String,
    description: String,
    link: String,
    type: String,
  },
  data() {
    return {
      types: ["blog", "book", "video"],
    };
  },
  methods: {
    submitForm() {
      this.$emit("on-form-submit");
    },
    changeTitle(title) {
      this.$emit("update:title", title);
    },
    changeDescription(description) {
      this.$emit("update:description", description);
    },
    changeLink(link) {
      this.$emit("update:link", link);
    },
    changeType(type) {
      this.$emit("update:type", type);
    },
  },
};
</script>
