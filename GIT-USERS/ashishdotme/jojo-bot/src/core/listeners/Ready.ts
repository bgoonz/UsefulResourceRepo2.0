import { Listener } from 'discord-akairo';

export default class Ready extends Listener {
	public constructor() {
		super('ready', {
			emitter: 'client',
			event: 'ready'
		});
	}

	public exec() {
		this.client.logger.log(`Bot logged in as ${this.client.user!.tag}`);
	}
}
