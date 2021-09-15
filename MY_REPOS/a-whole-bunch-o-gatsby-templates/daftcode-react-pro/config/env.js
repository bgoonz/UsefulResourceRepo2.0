'use strict';

const fs = require('fs');
const path = require('path');

// We support resolving modules according to `NODE_PATH`.
const appDirectory = fs.realpathSync(process.cwd());
process.env.NODE_PATH = (process.env.NODE_PATH || '')
  .split(path.delimiter)
  .filter(folder => folder && !path.isAbsolute(folder))
  .map(folder => path.resolve(appDirectory, folder))
  .join(path.delimiter);

function getClientEnvironment(env, publicUrl) {
  //prettier-ignore
  var dotenvFiles = [
    path.resolve(`.env.${env}.local`),
    path.resolve(`.env.${env}`),
      env !== 'test' && path.resolve(`.env.local`),
      path.resolve(`.env`)
    ].filter(Boolean);

  // Load environment variables from .env* files. Suppress warnings using silent
  dotenvFiles.forEach(dotenvFile => {
    if (fs.existsSync(dotenvFile)) {
      require('dotenv-expand')(
        require('dotenv').config({
          path: dotenvFile,
        })
      );
    }
  });

  const raw = Object.keys(process.env).reduce(
    (env, key) => {
      env[key] = process.env[key];
      return env;
    },
    {
      ...{
        // Useful for determining whether we’re running in production mode.
        // Most importantly, it switches React into the correct mode.
        NODE_ENV: env,
        PUBLIC_URL: publicUrl,
      },
    }
  );
  // Stringify all values so we can feed into Webpack DefinePlugin
  const stringified = {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };

  return { raw, stringified };
}

module.exports = getClientEnvironment;
