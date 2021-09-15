const imagekit = require("../imagekit/init");

const uploadPlaceholders = async ({
  amount = 20,
  dimensions = "640/480",
  folder = "/placeholders",
} = {}) => {
  const promises = [...Array(amount)].map((_, i) =>
    imagekit.uploadViaURL(
      `https://placekitten.com/${dimensions}?image=${i + 1}`,
      {
        filename: `${i + 1}`,
        folder,
        useUniqueFilename: false,
      }
    )
  );

  Promise.all(promises).then(console.log).catch(console.error);
};
module.exports = uploadPlaceholders;
