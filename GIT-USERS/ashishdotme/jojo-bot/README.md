# AkairoTemplate

My personal template for TypeScript based Discord bots built with Discord-Akairo and Discord.js.

## 🏢 Structure

-   `src/index.ts` - Main that instantiates the Client and ensures ENV vars exist.
-   `src/core/client/Client.ts` - Main Akairo Client.
-   `src/core/listeners/**` - Classes that listen for events.
-   `src/core/commands/**` - Commands for the bot.
-   `src/core/inhibitors/**` - Inhibitors that stop a command from being executed under certain conditions.
-   `src/core/structures/**` - Custom/Extended Structures.

## 📜 Scripts

-   `npm run build` - Build the bot
-   `npm run start` - Start the bot (requires build to have been run)
-   `npm run dev` - Build and run the bot
-   `npm run lint` - Lint the source code (No auto fix)
-   `npm run lint:fix` - Lint the source code (auto fix)

### LICENSING

**AkairoTemplate** © [zaida04](https://github.com/zaida04), Released under the
[MIT](https://github.com/zaida04/AkairoTemplate/blob/master/LICENSE) License.  
Authored and maintained by zaida04.

> GitHub [@zaida04](https://github.com/zaida04)

Created ~10/03/2020
