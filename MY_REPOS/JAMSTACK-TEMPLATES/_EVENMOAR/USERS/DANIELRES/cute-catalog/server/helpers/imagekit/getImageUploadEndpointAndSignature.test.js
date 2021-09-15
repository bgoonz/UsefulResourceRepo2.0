require("../env/init");
const getImageUploadEndpointAndSignature = require("./getImageUploadEndpointAndSignature");

describe("getImageUploadEndpointAndSignature()", () => {
  it("provides an imagekit upload endpoint, signature and apiKey", () => {
    const options = {
      filename: "cute-cat01.jpg",
      folder: "/cats",
    };

    const result = getImageUploadEndpointAndSignature(options);

    expect(result.apiKey).toEqual(process.env.IMAGEKIT_API_KEY);
    expect(result.endpoint).toEqual(
      `https://upload.imagekit.io/rest/api/image/${process.env.IMAGEKIT_ID}`
    );
    expect(result.signature.length).toEqual(40);
  });
});
