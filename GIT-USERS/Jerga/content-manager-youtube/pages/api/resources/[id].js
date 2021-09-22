import resources from "../data.json";

export default async function singleResource(req, res) {
  const resource = resources.find((resource) => resource.id === req.query.id);
  return res.send(resource);
}
