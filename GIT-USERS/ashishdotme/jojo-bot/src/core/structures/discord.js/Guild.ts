/** Only uncomment this block if you need to extend Guild. This will not work with D.js v13.
import { Structures } from "discord.js";
import Client from "../../client/Client";

Structures.extend("Guild", (Guild) => {
    return class extends Guild {
        public constructor(client: Client, data: any) {
            super(client, data);
        }
    };
});
**/
export const DELETE_THIS_IF_YOU_EXTEND_GUILD = '';
