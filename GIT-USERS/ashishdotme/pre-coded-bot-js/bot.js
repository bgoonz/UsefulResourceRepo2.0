const gradient = require("gradient-string");
console.log(gradient.fruit("Loading the bot..."));
console.log(gradient.rainbow("========================="));

const botconfig = require("./botconfig.json");
const colors = require("./colors.json");
const fs = require("fs");
const Discord = require("discord.js");
const { inspect } = require("util");
const client = new Discord.Client({ disableEveryone: false });

if (!botconfig.token || botconfig.token === `Insert_token_here`) {
  console.log(gradient.retro(`please provide a token!`));
  console.log(
    gradient.teen(
      `Refer to the discord developer portal (https://discord.com/developers/applications/) and the developer docs (https://discord.com/developers/docs/) on how to set up a bot and grab it's token.`
    )
  );
} else {
  client.prefix = ",";
  fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    console.log(`Loading ${files.length} events`);
    files.forEach((file) => {
      const event = require(`./events/${file}`);
      let eventName = file.split(".")[0];
      console.log(`Loaded event ` + gradient.retro(eventName));
      client.on(eventName, event.bind(null, client));
    });
  });

  client.commands = new Discord.Collection();
  fs.readdir("./commands/", (err, files) => {
    if (err) console.error(err);

    let jsfiles = files.filter((f) => f.split(".").pop() === "js");
    if (jsfiles.length <= 0) {
      console.log("No commands to load");
      return;
    }
    console.log("=========================");
    console.log(`Loading ${jsfiles.length} commands`);

    jsfiles.forEach((f, i) => {
      let props = require(`./commands/${f}`);
      let fg = gradient.retro(f);
      console.log(`${i + 1}: ${fg} loaded`);
      client.commands.set(props.help.name, props);
    });
  });
  client.login(botconfig.token);
}
