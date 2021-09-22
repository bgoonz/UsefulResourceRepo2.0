import resources from "./data.json";

export default async function activeResource(req, res) {
  const activeResource = resources.find(
    (resource) => resource.status === "active"
  );

  return res.send(activeResource);
}
