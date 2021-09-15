<template>
  <modal @modalSubmitted="createPost">
    <template #actionButton>
      <a class="button is-danger is-block is-bold">
        <span class="compose">Create</span>
      </a>
    </template>
    <form class="post-form">
      <div class="field">
        <label class="label">Title</label>
        <div class="control">
          <input
            v-model="form.title"
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
            v-model="form.subtitle"
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
            v-model="form.content"
            class="textarea"
            placeholder="Awesome Content"
          >
          </textarea>
        </div>
      </div>
      <div class="markdown">
        <label class="label">Contet Preview</label>
        <div v-html="compiledMarkdown"></div>
      </div>
    </form>
  </modal>
</template>

<script>
import Modal from "~/components/shared/Modal";
export default {
  components: {
    Modal,
  },
  data() {
    return {
      form: {
        title: "",
        subtitle: "",
        content: "",
      },
    };
  },
  computed: {
    compiledMarkdown() {
      if (process.client) {
        return marked(this.form.content, { sanitize: true });
      }

      return "";
    },
  },
  methods: {
    createPost({ closeModal, data }) {
      this.$store.dispatch("post/createPost", { ...this.form });
      closeModal();
      this.resetForm();
    },
    resetForm() {
      this.form.title = "";
      this.form.subtitle = "";
      this.form.content = "";
    },
  },
};
</script>
