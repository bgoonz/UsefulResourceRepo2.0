export default (req, res) => {
  const name = req.query.name
  res.status(200).send({
    value: `Hello, ${name}!`,
    request: {
      path: req.path,
      query: req.query,
      params: req.params,
      hostname: req.hostname,
      headers: JSON.stringify(req.headers),
    },
  })
}
