const Discord = require("discord.js");
module.exports = (guild) => {
  console.log(
    `Splendid, I'm now in ${guild.name} (id: ${guild.id}). if all calculations are right, I'm looking at another ${guild.memberCount} members!`
  );
};
