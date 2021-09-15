const log = (...args) => console.log(...args);

const h = str => log("\n" + `=== ${str} `.padEnd(50, "="));

const hr = () => log("".padEnd(50, "="));

module.exports = { h, hr, log };
