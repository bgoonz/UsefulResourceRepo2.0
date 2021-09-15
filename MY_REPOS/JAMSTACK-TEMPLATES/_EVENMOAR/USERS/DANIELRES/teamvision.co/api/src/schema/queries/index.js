const deleteAllRecords = require("./deleteAllRecords");
const {
  findNodeByLabelAndId,
  findNodeByLabelAndProperty,
  findNodesByLabel
} = require("./nodes");
const { searchPersons, createPerson, updatePerson } = require("./persons");
const { searchTags, createTag } = require("./tags");
const {
  applyTagging,
  getTaggingsByTagName,
  setTagOn,
  setTagParent,
  updateTagging
} = require("./taggings");
const getTagTreeData = require("./getTagTreeData");
const {
  createCurrentUserPerson,
  updateCurrentUserPersonName
} = require("./currentUser");

module.exports = {
  deleteAllRecords,
  // nodes
  findNodeByLabelAndId,
  findNodeByLabelAndProperty,
  findNodesByLabel,
  // persons
  searchPersons,
  createPerson,
  updatePerson,
  // tags
  searchTags,
  createTag,
  // taggings
  applyTagging,
  getTaggingsByTagName,
  setTagOn,
  setTagParent,
  updateTagging,
  // tagTreeData
  getTagTreeData,
  // currentUser
  createCurrentUserPerson,
  updateCurrentUserPersonName
};
