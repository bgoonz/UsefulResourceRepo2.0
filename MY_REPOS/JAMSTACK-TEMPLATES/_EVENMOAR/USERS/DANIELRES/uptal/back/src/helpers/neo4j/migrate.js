const Umzug = require("umzug");
const { h, hr, log } = require("../log");

const env = process.env.NODE_ENV;
const command = process.argv[2] || "up";
const path = "neo4j/migrations";

const umzug = new Umzug({
  migrations: { path },
  storage: "json",
  storageOptions: { path: `${path}/meta.${env}.json` }
});

const printLog = title => migrations => {
  if (!migrations.length) return h(`[${env}] No migrations to run`);

  h(title);
  log(migrations.map(m => m.file).join("\n"));
  hr();
};

switch (command) {
  case "up":
    umzug.up().then(printLog(`[${env}] Applied migrations:`));
    break;

  case "down":
    umzug.down().then(printLog(`[${env}] Rolled back migrations:`));
    break;

  case "respawn":
    umzug
      .down({ to: 0 })
      .then(printLog(`[${env}] Rolled back migrations:`))
      .then(umzug.up)
      .then(printLog(`[${env}] Applied migrations:`));
    break;
}
