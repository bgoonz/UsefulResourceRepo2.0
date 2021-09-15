export const log = process.env.LOG !== "false" ? console.log : () => {};

export const errorSummary = (str) => log(` ${str}:`);

export const error = ({ key, error, actual }) =>
  log(" ✗", `${key}: ${error} | Actual: ${actual}`);

export const hr = () => log("".padEnd(70, "╌"));

export const ln = () => log("\n");
