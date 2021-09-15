const Discord = require("discord.js");
module.exports = (guild) => {
  console.log(
    `yikes, I got the boot and was removed from ${guild.name} (id: ${guild.id})`
  );
  client.settings.delete(guild.id);
};
