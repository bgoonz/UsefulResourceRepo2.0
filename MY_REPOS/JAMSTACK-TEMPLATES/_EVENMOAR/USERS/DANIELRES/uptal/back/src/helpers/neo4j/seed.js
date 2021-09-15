const Umzug = require("umzug");
const fs = require("fs");
const path = require("path");

const purgeDb = require("./purgeDb");
const { h, hr, log } = require("../log");

const env = process.env.NODE_ENV;
const command = process.argv[2] || "up";
const seedsPath = "neo4j/seeds";
const metaPath = path.resolve(process.cwd(), seedsPath, `meta.${env}.json`);

const umzug = new Umzug({
  migrations: { path: seedsPath },
  storage: "json",
  storageOptions: { path: metaPath }
});

const printLog = title => seeds => {
  if (!seeds.length) return log(`[${env}] No seeds to run`);

  h(title);
  log(seeds.map(m => m.file).join("\n"));
  hr("");
};

switch (command) {
  case "up":
    umzug.up().then(printLog(`[${env}] Applied seeds:`));
    break;

  case "purge":
    purgeDb()
      .then(() => {
        log(`[${env}] Db purged from all content`);
        fs.writeFileSync(metaPath, "[]");
      })
      .catch(console.error);
    break;
}
