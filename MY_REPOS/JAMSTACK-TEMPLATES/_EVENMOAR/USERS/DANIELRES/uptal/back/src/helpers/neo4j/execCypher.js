const driver = require("./driver");

const execCypher = async (...args) => {
  const session = driver.session();
  await session.run(...args);
  session.close(() => driver.close());
};

module.exports = execCypher;
