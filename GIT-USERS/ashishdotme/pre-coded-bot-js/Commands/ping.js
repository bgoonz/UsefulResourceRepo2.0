const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  const m = await message.channel.send("Ping?");
  m.edit(`Pong! 
> :stopwatch: ${m.createdTimestamp - message.createdTimestamp}ms 
> :hourglass_flowing_sand: ${Math.round(client.ping)}ms`);
};

module.exports.help = {
  name: "ping",
  category: "util",
  description: "pong!",
};
