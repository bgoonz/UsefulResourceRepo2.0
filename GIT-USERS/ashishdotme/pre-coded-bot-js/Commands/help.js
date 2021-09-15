const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  let embed = new Discord.RichEmbed()
    .setTitle("**Help Menu**")
    .addField(
      ":wrench: Util",
      client.commands
        .filter((map2) => map2.help.category === "util")
        .map((cmd) => `\`${cmd.help.name}\``)
        .join(" ")
    )
    .setFooter(
      `${bot.user.username} | Based on the pre-coded bot script from WildcatNT!`
    )
    .setColor("#DA14EC");

  message.channel.send({ embed: embed });
};

module.exports.help = {
  name: "help",
  category: "util",
  description: "Displays all commands in an easy to read format.",
};
