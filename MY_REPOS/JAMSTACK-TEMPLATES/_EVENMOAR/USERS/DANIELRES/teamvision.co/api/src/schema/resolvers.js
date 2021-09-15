const { combineResolvers } = require("graphql-resolvers");
const { AuthenticationError } = require("apollo-server-express");
// TODO: replace by user data coming from auth
const TEMP_EMAIL = "TODO@example.com";

const {
  findNodeByLabelAndId,
  findNodeByLabelAndProperty,
  findNodesByLabel,
  getTagTreeData,
  searchPersons,
  createPerson,
  updatePerson,
  createCurrentUserPerson,
  searchTags,
  createTag,
  getTaggingsByTagName,
  applyTagging,
  updateTagging,
  setTagOn,
  setTagParent,
  updateCurrentUserPersonName
} = require("./queries");

const driver = require("../neo4jDriver");

const resolvers = {
  Query: {
    persons(obj, { search }, { isAuthenticated }) {
      if (!isAuthenticated) return new AuthenticationError("Forbidden");
      if (search) return searchPersons(search);
      return findNodesByLabel("Person");
    },

    person(obj, { id, email }, { isAuthenticated }) {
      if (!isAuthenticated) return new AuthenticationError("Forbidden");
      if (email) return findNodeByLabelAndProperty("Person", "email", email);
      if (id) return findNodeByLabelAndId("Person", id);
      return new Error('Missing argument "email" or "id"');
    },

    tags(obj, { search }, { isAuthenticated }) {
      if (!isAuthenticated) return new AuthenticationError("Forbidden");
      if (search) return searchTags(search);
      return findNodesByLabel("Tag");
    },

    tag(obj, { id, name }, { isAuthenticated }) {
      if (!isAuthenticated) return new AuthenticationError("Forbidden");
      if (name) return findNodeByLabelAndProperty("Tag", "name", name);
      if (id) return findNodeByLabelAndId("Tag", id);
      return new Error('Missing argument "name" or "id"');
    },

    tagTreeData(obj, args, { isAuthenticated }) {
      if (!isAuthenticated) return new AuthenticationError("Forbidden");
      return getTagTreeData();
    },

    userInfo(obj, {}, { isAuthenticated, userInfo }) {
      if (!isAuthenticated) return new AuthenticationError("Forbidden");
      return userInfo;
    }
  },

  Person: {
    taggings: async (person, args, vars) => {
      const query = `
        MATCH (tag:Tag) -[tagging:TAGGING]-> (target: Person {id: {id} })
        RETURN tagging,tag
        ORDER BY tagging.level DESC
      `;
      const params = { id: person.id };
      const session = driver.session();
      const { records } = await session.run(query, params);
      session.close();

      const taggings = records.map(r => ({
        ...r.get(0).properties,
        tag: r.get(1).properties
      }));
      return taggings;
    }
  },

  Tag: {
    taggings: (tag, args, vars) => getTaggingsByTagName({ tagName: tag.name })
  },

  TaggingRelationshipTarget: {
    __resolveType: obj => obj.label
  },

  Mutation: {
    createPerson: (obj, args, vars) => createPerson(args),
    updatePerson: (obj, args, vars) => updatePerson(args),
    createTag: (obj, args, vars) => createTag(args),
    applyTagging: (obj, args, vars) => applyTagging(args),
    setTagOn: (obj, args, vars) => setTagOn(args),
    setTagParent: async (obj, { parentName, tagName }, vars) => {
      await setTagParent({ parentName, tagName });
      return { tagName, parentName };
    },
    updateTagging: (obj, args, vars) => updateTagging(args),
    createCurrentUserPerson: combineResolvers(
      // TODO: isAuthenticated,
      (obj, args, { user }) => {
        // FIXME
        console.log({ user });
        return createCurrentUserPerson(TEMP_EMAIL);
      }
    ),

    updateCurrentUserPersonName: combineResolvers(
      // TODO: isAuthenticated,
      (obj, { name }, { user }) => {
        // FIXME
        console.log({ user });
        return updateCurrentUserPersonName({ name }, TEMP_EMAIL);
      }
    )
  }
};

module.exports = resolvers;
