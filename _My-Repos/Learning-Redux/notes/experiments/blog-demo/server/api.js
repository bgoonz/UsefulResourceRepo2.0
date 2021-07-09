import mongoose from "mongoose";
import { range } from "lodash";
import Post from "./models/Post";
import Comment from "./models/Comment";
import Category from "./models/Category";

mongoose.connect("mongodb://udacity:udacity@ds133814.mlab.com:33814/udacity");

const statuses = ["visited", "delivered", "converted"];
const times = ["morning", "afternoon", "evening"];
const random = (i) => Math.floor(Math.random() * i);

export default {
  post: {
    list: async (categoryId) => {
      return categoryId ? Post.find({ categoryId }) : Post.find({});
    },
    save: async (model) => {
      if (model._id) {
        return Post.findOneAndUpdate({ _id: model._id }, model).exec();
      }

      return new Post(model).save();
    },
    vote: async (postId) => {
      Post.update({ _id: postId }, { $inc: { score: 1 } });
    },
    delete: async (_id) => Post.remove({ _id }),
  },
  comment: {
    list: async () => Comment.find({}),
    save: async (model) => {
      if (model._id) {
        return Comment.findOneAndUpdate({ _id: model._id }, model).exec();
      }

      return new Comment(model).save();
    },
    delete: async (_id) => Comment.remove({ _id }),
  },
  category: {
    list: () => Category.find({}),
    regenerate: async () => {
      await Category.remove({});

      const categories = [
        { name: "react" },
        { name: "redux" },
        { name: "udacity" },
        { name: "redux-first-router" },
        { name: "apollo" },
        { name: "graphql" },
      ];

      return Category.insertMany(categories);
    },
  },
};
