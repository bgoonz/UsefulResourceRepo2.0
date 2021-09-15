import { Mongo } from "meteor/mongo";

Meteor.methods({
  "bins.insert": function () {
    return Bins.insert({
      createdAt: new Date(),
      content: "",
      sharedWith: [],
      ownerId: this.userId, //when we are logged in we have acces to userId in meteor method
    });
  },

  "bins.remove": function (bin) {
    return Bins.remove(bin);
  },

  "bins.update": function (bin, newContent) {
    return Bins.update(bin._id, { $set: { content: newContent } });
  },
});

export const Bins = new Mongo.Collection("bins");
