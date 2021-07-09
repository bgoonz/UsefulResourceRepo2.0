import api from "./api";

const getCategories = async (dispatch, getState) => {
  if (getState().categories.length === 0) {
    const models = await api.fetch("category/list");
    dispatch({ type: "CATEGORIES_FETCHED", payload: { models } });
  }
};

const getPosts = async (dispatch, getState) => {
  if (getState().posts.length === 0) {
    const models = await api.fetch("post/list");
    dispatch({ type: "POSTS_FETCHED", payload: { models } });
  }
};

export default {
  SELECT_CATEGORY: {
    thunk: async (dispatch, getState, { action }) => {
      const { categoryId } = action.payload;
      const models =
        categoryId === "all"
          ? await api.fetch("post/list")
          : await api.fetch(`post/list/${categoryId}`);

      dispatch({ type: "POSTS_FETCHED", payload: { models } });
    },
  },

  HOME: {
    path: "/",
    thunk: async (dispatch, getState) => {
      await getCategories(dispatch, getState);
      await getPosts(dispatch, getState);
    },
  },
  CREATE_POST: {
    path: "/post/create",
  },
  UPDATE_POST: {
    path: "/post/update/:_id",
  },
  SAVE_POST: {
    thunk: async (dispatch, getState) => {
      const { model } = getState();
      model.size = parseInt(model.size);
      await api.post("post/save", model);

      dispatch({ type: "HOME" });
    },
  },
  DELETE_POST: {
    thunk: async (dispatch, getState, { action }) => {
      await api.post(`post/delete`, action.payload);
    },
  },

  LIST_COMMENTS: {
    path: "/comments/:postId",
    thunk: async (dispatch, getState) => {
      getPosts(dispatch, getState);

      const { postId } = getState().location.payload;
      const models = await api.fetch(`comment/list/${postId}`);

      dispatch({ type: "COMMENTS_FETCHED", payload: { models } });
    },
  },
  CREATE_COMMENT: {
    path: "/comment/create",
    thunk: getPosts,
  },
  UPDATE_COMMENT: {
    path: "/comment/update/:_id",
    thunk: getPosts,
  },
  SAVE_COMMENT: {
    thunk: async (dispatch, getState) => {
      const { model } = getState();
      await api.post("comment/save", model);

      const postId = model.postId;
      dispatch({ type: "LIST_COMMENTS", payload: { postId } });
    },
  },
  DELETE_COMMENT: {
    thunk: async (dispatch, getState, { action }) => {
      await api.post(`comment/delete`, action.payload);
    },
  },
};
