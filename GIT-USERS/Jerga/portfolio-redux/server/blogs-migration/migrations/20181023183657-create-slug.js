const slugify = require("slugify");

module.exports = {
  up(db) {
    console.log(db);
    // TODO write your migration here. Return a Promise (and/or use async & await).
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    return db.collection("blogs").updateMany(
      {},
      {
        $set: { isSlugCreated: true },
        $set: {
          slug: slugify(this.title, {
            replacement: "-", // replace spaces with replacement
            remove: null, // regex to remove characters
            lower: true, // result in lower case
          }),
        },
      }
    );
  },

  down(db) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // return db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
    return db
      .collection("blogs")
      .updateMany({}, { $set: { isSlugCreated: false }, $set: { slug: "" } });
  },
};
