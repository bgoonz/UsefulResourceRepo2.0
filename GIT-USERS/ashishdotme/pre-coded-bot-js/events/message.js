const defaultSettings = require("../defaultSettings.json");
const Discord = require("discord.js");

module.exports = (client, message) => {
  const TLC = message.content.toLowerCase();
  if (message.author.bot || !message.guild) return;

  if (message.isMentioned(client.user)) {
    message.reply(
      `My prefix is \`${defaultSettings.prefix}\`. Use \`${defaultSettings.prefix}help\` to see my commands!`
    );
  }

  let messageArray = message.content.split(" ");
  let command = messageArray[0];
  let args = messageArray.slice(1);

  if (message.content.includes("<:MSBear:666128276061945909>")) {
    message.channel.send(
      "What a very peculiar bear... Only WildcatNT could send that so..."
    );
  }

  if (!command.startsWith(client.prefix)) return;

  let cmd = client.commands.get(command.slice(client.prefix.length));
  if (cmd) cmd.run(client, message, args);
};
