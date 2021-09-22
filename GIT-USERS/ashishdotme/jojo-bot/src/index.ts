import Client from './core/client/Client';
import { config } from 'dotenv';
import { ClientOptions } from './typings';
config();

['DEFAULTPREFIX', 'TOKEN'].forEach((x) => {
	if (!process.env[x]) throw new Error(`Missing ${x} env variable!`);
});

const options: ClientOptions = {
	defaultPrefix: process.env.DEFAULTPREFIX!,
	ownerId: process.env.OWNERID
};

const BotClient = new Client(options);
void BotClient.login(process.env.TOKEN!);
