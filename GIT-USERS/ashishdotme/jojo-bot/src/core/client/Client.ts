import { AkairoClient, CommandHandler, ListenerHandler, InhibitorHandler } from 'discord-akairo';
import { join } from 'path';
import { ClientOptions } from '../../typings';

import '../../typings/Akairo';
import '../../typings/Guild';
import Logger from '../../util';

export default class Client extends AkairoClient {
	public logger = Logger.getInstance();

	public constructor(public readonly config: ClientOptions) {
		super(
			{
				ownerID: config.ownerId ? [config.ownerId] : undefined
			},
			{
				disableMentions: 'everyone',
				partials: ['MESSAGE', 'CHANNEL', 'REACTION']
			}
		);

		this.commandHandler = new CommandHandler(this, {
			directory: join(__dirname, '/../commands/'),
			prefix: this.config.defaultPrefix,
			allowMention: true,
			defaultCooldown: 5000
		});
		this.listenerHandler = new ListenerHandler(this, {
			directory: join(__dirname, '/../listeners/')
		});
		this.inhibitorHandler = new InhibitorHandler(this, {
			directory: join(__dirname, '/../inhibitors/')
		});
	}

	private _init() {
		this.commandHandler.useListenerHandler(this.listenerHandler);
		this.commandHandler.useInhibitorHandler(this.inhibitorHandler);

		this.listenerHandler.setEmitters({
			commandHandler: this.commandHandler,
			listenerHandler: this.listenerHandler,
			inhibitorHandler: this.inhibitorHandler
		});

		this.commandHandler.loadAll();
		this.listenerHandler.loadAll();
		this.inhibitorHandler.loadAll();
	}

	public async login(token: string) {
		this._init();
		this.logger.log('Logging in...');
		return super.login(token);
	}
}
