<template>
  <div class="manage container pt-3">
    <div class="row">
      <div class="col-12 pb-3">
        <PostCreate />
      </div>
      <div class="col-12 col-md-7">
        <div
          class="card mb-3"
          v-for="post in posts"
          :key="post.Id"
          @click="selectPost(post)"
          :class="{ 'active-card': post.Id === activePost.Id }"
        >
          <div class="card-body">
            <p class="name-author">
              from Huykiara {{ post.created_at | formatDate }}
            </p>
            <h4 class="card-title text-truncate">{{ post.Title }}</h4>
            <p class="card-text text-multie">{{ post.Description }}</p>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-5">
        <PostManage v-if="activePost" :postData="activePost"></PostManage>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapState } from "vuex";
import PostCreate from "@/components/PostCreate";
import PostManage from "@/components/PostManage";
export default {
  components: {
    PostCreate,
    PostManage,
  },
  data() {
    return {
      selectItem: 0,
      selectedPost: null,
    };
  },
  computed: {
    posts() {
      return this.$store.state.myPost.posts;
    },
    activePost() {
      return this.selectedPost || this.posts[0] || null;
    },
  },
  mounted() {
    if (this.$store.state.myPost.posts.length === 0) {
      this.$store.dispatch("fetchPost");
    }
  },
  methods: {
    selectPost(post) {
      this.selectedPost = post;
    },
  },
};
</script>

<style lang="css">
.card {
  cursor: pointer;
}

.card:hover {
  background: #fafafa;
}

.card.active-card {
  border-color: red;
  background: #fafafa;
}
</style>
