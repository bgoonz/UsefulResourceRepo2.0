<template>
  <modal @modalSubmited="createPost">
    <!--                Jak nic nie podamy zostanie wzięta wartość domyślna-->
    <!--                z Modal-->
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
          ></textarea>
        </div>
      </div>
    </form>
  </modal>
</template>

<script>
import Modal from "~/components/shared/Modal";

export default {
  name: "PostCreate",
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
  methods: {
    createPost(closeModal) {
      //Dispatch action with our form data
      //Musi być ... i jako obiekt bo inacej wystąpi błąd przy resetowaniu formularza
      //ponieważ this.form jest już zbindowane z Vuexem, i nastąpi podmiana wartości
      //przez referencje. ...this.form powoduje sklonowanie obiektu
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

<style scoped></style>
