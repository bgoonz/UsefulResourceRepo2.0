import Vue from "vue";
// import {INITIAL_DATA} from './index';
import INITIAL_DATA from "./initial_data.json";

//Symulacja API
export function fetchPostsAPI() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(INITIAL_DATA.posts);
    }, 0);
  });
}

export const state = () => {
  return {
    items: [],
    archivedItems: [],
  };
};

//Getters are like computed properties but for vuex
export const getters = {
  hasEmptyItems(state) {
    return state.items.length === 0;
  },
};

//Good spot to send a request to a server
//Usually Actions resolve into some data
export const actions = {
  getArchivedPosts(ctx) {
    const archivedPosts = localStorage.getItem("archived_posts");
    if (archivedPosts) {
      ctx.commit("setArchivedPosts", JSON.parse(archivedPosts));
      return archivedPosts;
    } else {
      localStorage.setItem("archived_posts", JSON.stringify([]));
      return [];
    }
  },
  togglePost(ctx, postId) {
    if (ctx.state.archivedItems.includes(postId)) {
      //Remove post id
      const index = ctx.state.archivedItems.findIndex((pId) => pId === postId);
      ctx.commit("removeArchivedPost", index);
      ctx.dispatch("persistArchivedPosts");
      return postId;
    } else {
      //Add post id
      ctx.commit("addArchivedPost", postId);
      ctx.dispatch("persistArchivedPosts");
      return postId;
    }
  },
  persistArchivedPosts({ state }) {
    localStorage.setItem("archived_posts", JSON.stringify(state.archivedItems));
  },
  fetchPosts(ctx) {
    return this.$axios.$get("/api/posts").then((posts) => {
      ctx.commit("setPosts", posts);
    });
  },
  createPost(ctx, data) {
    //create post on a server, or persist data in some way
    data._id = Math.random().toString(36).substr(2, 7);
    data.createdAt = new Date().getTime();

    return this.$axios.$post("/api/posts", data).then((res) => {
      console.log(res);
      ctx.commit("addPost", data);
      return data;
    });
  },
  updatePost(ctx, data) {
    const index = ctx.state.items.findIndex((post) => post._id === data._id);
    if (index !== -1) {
      return this.$axios.$patch(`/api/posts/${data._id}`, data).then((res) => {
        console.log(res);
        ctx.commit("replacePost", { post: data, index });
        return data;
      });
    }
  },
  deletePost(ctx, id) {
    const index = ctx.state.items.findIndex((post) => post._id === id);
    if (index !== -1) {
      return this.$axios.delete(`/api/posts/${id}`).then((res) => {
        console.log(res);
        ctx.commit("deletePost", index);
        return id;
      });
    }
  },
};

//Muations are simple functions that have access to state
//Mutations are used to assign values to a state
export const mutations = {
  setArchivedPosts(state, archivedPosts) {
    state.archivedItems = archivedPosts;
  },
  addArchivedPost(state, postId) {
    state.archivedItems.push(postId);
  },
  removeArchivedPost(state, index) {
    state.archivedItems.splice(index, 1);
  },
  setPosts(state, posts) {
    state.items = posts;
  },
  addPost(state, post) {
    state.items.push(post);
  },
  replacePost(state, { post, index }) {
    //To nie działa!
    // state.posts[index] = post;
    Vue.set(state.items, index, post);

    //to działa
    // state.items.splice(index, 1, post);
  },
  deletePost(state, index) {
    state.items.splice(index, 1);
  },
};
