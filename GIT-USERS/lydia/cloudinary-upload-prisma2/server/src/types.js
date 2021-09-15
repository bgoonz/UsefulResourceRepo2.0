const { objectType, inputObjectType, arg } = require("nexus");
const { uploadImage, catchErrors } = require("../utils");

const Image = objectType({
  name: "Image",
  definition(t) {
    t.id("id");
    t.string("publicId");
    t.string("format");
    t.string("version");
  }
});

const Mutation = objectType({
  name: "Mutation",
  definition(t) {
    t.field("uploadImage", {
      type: Image,
      args: {
        input: arg({
          type: ImageInput,
          required: true
        })
      },
      resolve: catchErrors(async (_, { input }, { photon }) => {
        const res = await uploadImage(input.path);
        return photon.images.create({
          data: {
            publicId: res.public_id,
            format: res.format,
            version: res.version.toString()
          }
        });
      })
    });
  }
});

const Query = objectType({
  name: "Query",
  definition(t) {
    t.field("image", { type: Image });
    t.list.field("images", {
      type: Image,
      resolve: catchErrors(async (_, args, { photon }) => {
        return await photon.images.findMany();
      })
    });
  }
});

const ImageInput = inputObjectType({
  name: "ImageInput",
  definition(t) {
    t.string("path", { required: true });
  }
});

module.exports = { Image, Mutation, Query, ImageInput };
