const defaultSettings = require("../defaultSettings.json");
module.exports = (client, member) => {
  console.log(`${member.user.username} has joined a server I'm in!`);
};
