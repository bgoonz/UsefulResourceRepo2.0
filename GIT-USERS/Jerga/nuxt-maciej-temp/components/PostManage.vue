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
    <button @click.prevent="updatePost" class="button is-primary">
      Update
    </button>
  </form>
</template>

<script>
export default {
  name: "PostManage",
  props: ["postData"],
  data() {
    return {
      post: { ...this.postData },
    };
  },
  //Watch pozwala na aktualizację danych! komponent się stworzyłz domyślnym
  //Pustym obiektem. Watch pomaga na aktualizację tych danych
  watch: {
    postData(newValue, oldValue) {
      //Przypisuję do zmiennej post aktualny obiekt
      this.post = { ...newValue };
    },
  },
  methods: {
    updatePost() {
      this.$store.dispatch("post/updatePost", { ...this.post });
    },
  },
};
</script>

<style scoped></style>
