# Pre-coded bot

a discord.js starting base.

# What's changed since the last version:

- Added command handler, with help from [Stringy](https://github.com/etstringy/)
- Removed node-fetch, womp womp.
- Made readme more... markdown friendly.

# preperation

PLEASE RUN `npm install` OR `yarn` to install all packages.

### PRE-CODED BOT

_Constructed by WildcatNT_

**1: Using special colors**

To use a special color, just grab it's [hex number](https://www.color-hex.com/)! To use that in am embed, use `.setColor(#000000)` in the emded field where `#000000` is the hex number of your color.

**2: running the bot**

Running the bot is as simple as placing your token in config.json and using node.js! with the command prompt, type in `npm install` (or `yarn`), strike ENTER/RETURN, then type `node bot.js` and hit enter to see the bot come to life!

**3: adding/removing commands**

Adding commands is simple, just create a js file with the name `commandname.js`, where `commandname` is the name of the command. the help command will properly edit if your command is in a category defined in `help.js`. creating a category is simple, too! just copy and paste this code and replace the word `example` with the category's name (and emoji if there is a compatible emoji that fits with your category, wether it be custom or not), while `cat` is the word that you use to define where your command goes. strike enter before pasting the code in help.js though!

```javascript
      .addField(":question: example", client.commands.filter(map2=> map2.help.category === "cat").map(cmd => `\`${cmd.help.name}\``).join(" "))
```

**4: testing the bot**

once the bot is online, I highly suggest running the ping command (**`{prefix}ping`**) to see if the bot is online and working. if not, check your token, ensure the ping cmd is there, and rerun your test. otherwise DM me on Discord (****IcebearNT#1987****) with an invite to your testing server.

**5: Triggers**

adding triggers is as easy as adding commands. use `if((message.content.toLowercase).includes("trigger")){}` OR `if((message.content).includes("trigger")` in message.js instead of creating a command, where `trigger` is the trigger word. there is already a trigger on the bot (`if((message.content).includes("<:MSBear:666128276061945909>"))`). do NOT remove that one, as that allows me to test the bot if it isn't working.

DO NOT EDIT, MOVE, OR DELETE PACKAGE.JSON, YARN.LOCK OR PACKAGE-LOCK.JSON. THAT IS FOR NPM/YARN TO SEE WHAT YOU NEED.

# My other stuff (I guess):

**[Python "branch" of this](https://github.com/wildcatnt/pre-coded-bot-py/)**
