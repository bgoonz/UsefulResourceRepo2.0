module.exports = {
  type: "file",
  encoding: "base64",
  size: 5362,
  name: "auto-label.yml",
  path: "auto-label.yml",
  content: Buffer.from(
    `
types:
  fix: fix
  feat: feature
  awesome: awesome feature
  bad: not good
`.trim()
  ).toString("base64")
};
