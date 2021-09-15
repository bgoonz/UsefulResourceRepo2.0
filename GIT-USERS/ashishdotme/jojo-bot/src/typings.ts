import Logger from './util';

export interface ClientOptions {
	defaultPrefix: string;
	ownerId?: string;
}

declare module 'discord-akairo' {
	interface AkairoClient {
		config: ClientOptions;
		commandHandler: CommandHandler;
		listenerHandler: ListenerHandler;
		inhibitorHandler: InhibitorHandler;
		logger: Logger;
	}
	interface Command {
		subCommands?: string[];
	}
}

declare module 'discord.js' {
	// interface Guild {}
}
