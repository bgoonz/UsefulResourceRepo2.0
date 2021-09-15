export default {
  methods: {
    textUtility_capitilize(word) {
      if (word && typeof word === "string") {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
    },
  },
};
