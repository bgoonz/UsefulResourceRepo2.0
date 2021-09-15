const sanityClient = require("@sanity/client");
const Configstore = require("configstore");

const config = new Configstore("sanity", {}, { globalConfigPath: true });
const token = process.env.SANITY_TOKEN || config.get("authToken");
const dataset = process.env.SANITY_DATASET || "production";

async function createProject({ projectName, dataset, token }) {
  if (!token) {
    throw new Error(
      'no sanity token provided, either provide an API token via "SANITY_TOKEN" environment variable or login into sanity using sanity cli "sanity login"'
    );
  }
  if (!dataset) {
    throw new Error("no dataset provided");
  }

  const client = sanityClient({
    useProjectHostname: false,
    token: token,
    useCdn: false,
  });

  console.log("creating a project...");
  const project = await client.request({
    url: "/projects",
    method: "POST",
    body: {
      displayName: projectName,
    },
  });

  console.log("created a project, projectId:", project.id);

  console.log("creating a dataset...");
  await client.request({
    url: `/projects/${project.id}/datasets/${dataset}`,
    method: "PUT",
    body: {
      aclMode: "private",
    },
  });
  console.log("created a dataset");
}

createProject({
  projectName: "My Sanity Project",
  dataset,
  token,
}).catch((error) => {
  console.error("failed to create new project", error);
});
