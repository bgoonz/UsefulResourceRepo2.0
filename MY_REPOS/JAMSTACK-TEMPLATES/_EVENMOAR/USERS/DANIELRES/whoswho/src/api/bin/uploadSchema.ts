import fs from "fs";
import request from "request";
import * as config from "../config";

export const uploadSchema = async (secret: string, file: string) => {
  const url = config.fauna.graphql.import.endpoint;

  try {
    console.log("Uploading Graphql Schema...\n");
    const response = await streamUpload(url, secret, file);
    console.log(response);
  } catch (error) {
    console.log(`Error during schema import`);
    console.log(error);
    process.exit(1);
  }
};

// If file called directly (not imported):
if (require.main === module) {
  uploadSchema(config.fauna.keys.admin, config.fauna.graphql.schema.path);
}

function streamUpload(url: string, token: string, file: string) {
  return new Promise((resolve, reject) => {
    fs.createReadStream(file).pipe(
      request.post(
        url,
        { headers: { Authorization: `Bearer ${token}` } },
        (err, res, body) => {
          if (err) reject(err);
          resolve(body);
        }
      )
    );
  });
}
