<template>
  <div>
    <navbar />
    <div class="manage-page">
      <div class="columns mail-app">
        <aside class="column is-2 aside hero">
          <post-create />
        </aside>
        <div class="column is-4 messages hero is-fullheight" id="message-feed">
          <div
            v-if="posts && posts.length > 0"
            class="inbox-messages"
            id="inbox-messages"
          >
            <div
              @click="activatePost(post)"
              v-for="post in posts"
              :key="post._id"
              class="card"
              :class="{
                'is-active': activePost && post._id === activePost._id,
              }"
            >
              <div class="card-content">
                <div class="msg-header">
                  <span class="msg-from"
                    ><small>From Maciej Tyrcha</small></span
                  >
                  <span class="msg-timestamp"></span>
                  <span class="msg-attachment"
                    ><i class="fa fa-paperclip"></i
                  ></span>
                </div>
                <div class="msg-subject">
                  <span class="msg-subject"
                    ><strong id="fake-subject-1">{{ post.title }}</strong></span
                  >
                </div>
                <div class="msg-snippet">
                  <p id="fake-snippet-1">{{ post.subtitle }}</p>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="inbox-messages no-posts-title">
            There are no posts!
          </div>
        </div>
        <div class="column is-6 message hero is-fullheight" id="message-pane">
          <div v-if="activePost" class="box message-preview">
            <button @click="deletePost" class="button is-danger delete-button">
              Delete
            </button>
            <post-manage :postData="activePost" />
          </div>
        </div>
      </div>
      <footer class="footer">
        <div class="container">
          <div class="content has-text-centered">
            <p>
              <strong>Bulma Templates</strong> by
              <a href="https://github.com/dansup">Daniel Supernault</a>. The
              source code is licensed
              <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
            </p>
            <p>
              <a class="icon" href="https://github.com/dansup/bulma-templates">
                <i class="fa fa-github"></i>
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import Navbar from "~/components/Navbar";
import PostCreate from "~/components/PostCreate";
import PostManage from "~/components/PostManage";

import { mapState } from "vuex";

export default {
  name: "manage",
  components: {
    Navbar,
    PostCreate,
    PostManage,
  },
  data() {
    return {
      activePost: null,
    };
  },
  computed: {
    ...mapState({
      posts: (state) => state.post.items,
    }),
  },
  fetch(ctx) {
    //If po to, żeby za każdym razem nie fetchować danych
    if (ctx.store.getters["post/hasEmptyItems"]) {
      return ctx.store.dispatch("post/fetchPosts");
    }
  },
  created() {
    this.setInitialActivePost();
  },
  methods: {
    activatePost(post) {
      this.activePost = post;
    },
    setInitialActivePost() {
      if (this.posts && this.posts.length > 0) {
        this.activePost = this.posts[0];
      } else {
        this.activePost = null;
      }
    },
    deletePost() {
      if (this.activePost) {
        this.$store
          .dispatch("post/deletePost", this.activePost._id)
          .then(() => {
            this.setInitialActivePost();
          });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.manage-page {
  padding: 30px;
}

.card {
  margin-bottom: 10px;

  &.is-active {
    background-color: #eee;
  }

  &:hover {
    cursor: pointer;
    background-color: #eeeeee;
  }
}

.no-posts-title {
  font-size: 30px;
}

.delete-button {
  display: block;
  width: 100px;
  margin-left: auto;
  margin-right: 0;
}
</style>
