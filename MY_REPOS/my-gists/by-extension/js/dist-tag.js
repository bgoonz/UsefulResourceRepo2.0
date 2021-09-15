"use strict";

/* eslint
  import/no-extraneous-dependencies: off,
  node/no-extraneous-require: off,
*/
const npa = require("npm-package-arg");
const fetch = require("npm-registry-fetch");
const RegistryConfig = require("npm-registry-fetch/config");

module.exports.add = add;
function add(spec, tag, opts) {
  // tag is not in the pudding spec, handle separately
  const cleanTag = (tag || opts.get("tag")).trim();

  // eslint-disable-next-line no-param-reassign
  opts = RegistryConfig(opts, {
    spec: npa(spec),
  });

  const { name, rawSpec: version } = opts.spec;

  opts.log.verbose("dist-tag add", cleanTag, "to", `${name}@${version}`);

  return fetchTags(opts).then(tags => {
    if (tags[cleanTag] === version) {
      opts.log.warn("dist-tag add", cleanTag, "already set to", version);
      return;
    }

    const uri = `-/package/${opts.spec.escapedName}/dist-tags/${cleanTag}`;
    const payload = opts.concat({
      method: "PUT",
      body: JSON.stringify(version),
      headers: {
        // cannot use fetch.json() due to HTTP 204 response,
        // so we manually set the required content-type
        "content-type": "application/json",
      },
    });

    // success returns HTTP 204, thus no JSON to parse
    return fetch(uri, payload)
      .then(() => {
        // eslint-disable-next-line no-console
        console.log(`+${cleanTag}: ${name}@${version}`);
      })
      .catch(handleError);
  });
}

module.exports.remove = remove;
function remove(spec, tag, opts) {
  // eslint-disable-next-line no-param-reassign
  opts = RegistryConfig(opts, {
    spec: npa(spec),
  });

  opts.log.verbose("dist-tag del", tag, "from", opts.spec.name);

  return fetchTags(opts).then(tags => {
    const version = tags[tag];

    if (!version) {
      opts.log.info("dist-tag del", tag, "is not a dist-tag on", opts.spec.name);
      return;
    }

    const uri = `-/package/${opts.spec.escapedName}/dist-tags/${tag}`;
    const payload = opts.concat({
      method: "DELETE",
    });

    // the delete properly returns a 204, so no json to parse
    return fetch(uri, payload)
      .then(() => {
        // eslint-disable-next-line no-console
        console.log(`-${tag}: ${opts.spec.name}@${version}`);
      })
      .catch(handleError);
  });
}

module.exports.list = list;
function list(spec, opts) {
  // eslint-disable-next-line no-param-reassign
  opts = RegistryConfig(opts, {
    spec: npa(spec),
  });

  return fetchTags(opts)
    .then(tags => {
      // eslint-disable-next-line no-console
      console.log(
        Object.keys(tags)
          .map(k => `${k}: ${tags[k]}`)
          .sort()
          .join("\n")
      );
    })
    .catch(handleError);
}

function fetchTags(opts) {
  const uri = `-/package/${opts.spec.escapedName}/dist-tags`;

  return fetch.json(uri, opts);
}

function handleError(error) {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exitCode = 1;
}

/* TESTING:

node -e "require('./dist-tag').list('@pectin/cli', require('@lerna/npm-conf')())"
node -e "require('./dist-tag').add('@pectin/cli@1.1.0', 'testing', require('@lerna/npm-conf')())"
node -e "require('./dist-tag').remove('@pectin/cli', 'testing', require('@lerna/npm-conf')())"

# with logging, pass { log: require('npmlog') } to npm-conf execution
*/
