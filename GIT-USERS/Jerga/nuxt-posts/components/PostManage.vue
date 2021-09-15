<template>
  <form class="post-form">
    <div class="field">
      <label class="label">Title</label>
      <div class="control">
        <input
          v-model="post.title"
          class="input"
          type="text"
          placeholder="Awesome Title"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">Subtitle</label>
      <div class="control">
        <input
          v-model="post.subtitle"
          class="input"
          type="text"
          placeholder="Awesome subtitle"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">Content</label>
      <div class="control">
        <textarea
          v-model="post.content"
          class="textarea"
          placeholder="Awesome Content"
        ></textarea>
      </div>
    </div>
    <div class="markdown">
      <label class="label">Contet Preview</label>
      <div v-html="compiledMarkdown"></div>
    </div>
    <button @click.prevent="updatePost" class="button is-primary">
      Update
    </button>
  </form>
</template>

<script>
export default {
  props: ["postData"],
  data() {
    return {
      post: { ...this.postData },
    };
  },
  watch: {
    postData(data) {
      this.post = { ...data };
    },
  },
  computed: {
    compiledMarkdown() {
      if (process.client) {
        return marked(this.post.content, { sanitize: true });
      }

      return "";
    },
  },
  methods: {
    updatePost() {
      debugger;
      this.$store.dispatch("post/updatePost", { ...this.post });
    },
  },
};
</script>
