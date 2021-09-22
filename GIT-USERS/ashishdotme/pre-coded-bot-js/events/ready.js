const gradient = require("gradient-string");
const config = require("../config.json");

module.exports = (client) => {
  console.log("=========================");
  console.log(gradient.cristal("Bot is online!"));
  console.log(gradient.fruit(`${client.user.username} (${client.user.id})`));
  console.log(gradient.retro("pre-coded bot module made by WildcatNT."));

  let presence =
    config.presences[Math.floor(Math.random() * config.presences.length)];
  client.user.setPresence({ game: { name: presence }, status: "streaming" });
};
