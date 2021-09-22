<template>
  <div class="post">
    <div class="post-content">
      <a class="post-header post-header-link clickable">
        <h4 class="title is-4">{{ title }}</h4>
        <h5 class="subtitle is-5">{{ subtitle }}</h5>
      </a>
      <div class="post-footer">by Maciej Tyrcha, {{ date | formatDate }}</div>
    </div>
    <div class="post-right">
      <label class="checkbox">
        <input @change="togglePost" type="checkbox" :checked="isArchived" />
        Read
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostItem",
  props: {
    _id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: false,
    },
    date: {
      type: Number,
      default: new Date(),
    },
    isRead: {
      type: Boolean,
      required: false,
    },
  },
  computed: {
    archivedPosts() {
      return this.$store.state.post.archivedItems;
    },
    isArchived() {
      return this.archivedPosts.includes(this._id);
    },
  },
  methods: {
    togglePost() {
      this.$store.dispatch("post/togglePost", this._id);
    },
  },
};
</script>

<style scoped lang="scss">
.post {
  margin-bottom: 20px;
  padding: 5px;
  border-bottom: 2px solid transparent;
  display: flex;
  flex-direction: row;

  &-footer {
    font-style: italic;
  }

  &-content {
    flex: 1;
  }

  &-right {
    float: right;
    justify-content: flex-end;
    align-self: center;
  }

  &:hover {
    border-bottom: 2px solid #e8e8e8;
  }
}
</style>
