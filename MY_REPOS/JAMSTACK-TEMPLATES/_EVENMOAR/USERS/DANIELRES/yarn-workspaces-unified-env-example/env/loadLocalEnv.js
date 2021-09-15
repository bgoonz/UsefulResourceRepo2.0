const LOCAL_ENV_PATH = "./local.json";

module.exports = NODE_ENV => {
  let local;

  try {
    console.log(
      `[ENV][loadLocal] Loading local environment from ${LOCAL_ENV_PATH}`
    );
    local = require(LOCAL_ENV_PATH);
  } catch (error) {
    console.log(`[ENV][loadLocal] No ${LOCAL_ENV_PATH} available.`);
    return;
  }

  if (!["development", "test"].includes(NODE_ENV)) return;

  if (local[NODE_ENV])
    Object.entries(local[NODE_ENV]).map(([k, v]) => {
      setEnv(k, v);
    });

  Object.entries(local).map(([k, v]) => {
    if (!["string", "number"].includes(typeof v)) return;
    setEnv(k, v);
  });
};

function setEnv(k, v) {
  if (!process.env[k]) process.env[k] = v;
}
