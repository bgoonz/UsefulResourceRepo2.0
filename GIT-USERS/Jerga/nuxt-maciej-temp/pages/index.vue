<template>
  <div>
    <navbar />
    <div class="blogs-page">
      <div class="main-content">
        <div class="container">
          <div class="columns is-mobile">
            <div class="column is-8 is-offset-2">
              <div class="section">
                <div class="title">
                  <h1>Newest Posts</h1>
                  <hr />
                </div>
                <div v-if="posts && posts.length > 0">
                  <post-item
                    v-for="post in posts"
                    :key="post._id"
                    :title="post.title"
                    :subtitle="post.subtitle"
                    :date="post.createdAt"
                    :isRead="post.isRead"
                    :_id="post._id"
                  />
                </div>
                <div v-else>No Posts</div>
              </div>
              <!-- end of post -->
            </div>
            <!-- end of side bar -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "~/components/Navbar";
import PostItem from "~/components/PostItem";

import { fetchPostsAPI } from "~/store/post";

export default {
  components: {
    Navbar,
    PostItem,
  },
  data() {
    return {
      title: "My Title From Page",
      // posts: this.$store.state.posts,
    };
  },
  //Używamy bez computed.
  // async asyncData() {
  //   const posts = await fetchPostsAPI();
  //   return {posts};
  // },
  fetch(ctx) {
    //Fetch łączy się z computed properties.
    //można użyć albo return dane albo używając async /await
    //If po to, żeby za każdym razem nie fetchować danych
    // if(ctx.store.state.post.items.length === 0) {
    //   return ctx.store.dispatch('post/fetchPosts');
    // }

    if (ctx.store.getters["post/hasEmptyItems"]) {
      return ctx.store.dispatch("post/fetchPosts");
    }
  },
  mounted() {
    this.$store.dispatch("post/getArchivedPosts");
  },
  // async fetch(ctx){
  //   await ctx.store.dispatch('post/fetchPosts');
  // },
  computed: {
    //Methods vs computed. Metody wywołują się za każdym razem
    //a computed tylko jeżeli dana zmienna w nim występująca
    //ulegnie zmianie
    //Jak damy to w data to nie będzie dało rady aktualizować danych
    //na bieżąco
    posts() {
      //post.items to ścieżka do tego pliku
      return this.$store.state.post.items;
    },
    archivedPosts() {
      return this.$store.state.post.archivedItems;
    },
  },
  //Jak użyjemy tego zamiast fetcha to strona się załaduje
  //po czym po chwili dojdą dane. Fetch ładuje stronę
  //wraz z danymi od razu. Musi być użyte wraz z computed
  // mounted() {
  //   this.$store.dispatch('post/fetchPosts')
  //     .then(posts => {
  //       console.log(posts);
  //     });
  // },
};
</script>

<style></style>
