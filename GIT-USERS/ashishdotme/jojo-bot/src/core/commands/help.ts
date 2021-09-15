import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import { stripIndents } from 'common-tags';

export default class Help extends Command {
	public constructor() {
		super('help', {
			aliases: ['help', 'h'],
			args: [
				{
					id: 'command',
					type: 'commandAlias',
					default: null
				}
			],
			category: 'util',
			description: {
				content: 'Displays information about a command',
				usage: '[command]',
				example: ['ban']
			}
		});
	}

	public async exec(message: Message, { command }: { command?: Command }) {
		const prefix = this.client.config.defaultPrefix;
		const embed = new MessageEmbed().setColor('PURPLE');

		// derived from https://github.com/Naval-Base/yuudachi/blob/master/src/bot/commands/util/help.ts
		if (command) {
			embed.addField('❯ Description', command.description.content || 'No Description provided');

			if (command.description.usage) {
				embed.addField(
					'❯ Usage',
					`\`${prefix}${command.aliases[0]}${
						command.description.usage ? ` ${command.description.usage}` : ''
					}\``
				);
			}

			if (command.description.example.length > 0)
				embed.addField(
					'❯ Examples',
					command.description.example.map((x: string[]) => `\`${prefix}${x}\``).join('\n')
				);

			if (command.aliases.filter((x: string) => x !== command.id).length > 1) {
				embed.addField(
					'❯ Aliases',
					`\`${command.aliases.filter((x: string) => x !== command.id).join('`, `')}\``
				);
			}
			return message.channel.send(embed);
		}
		embed.setTitle('Commands').setDescription(
			stripIndents`
					A list of available commands.
                    For additional info on a command, type \`${prefix}help [command]\`
                    
                    **Legend:**
                    
                    \`<arg>\` - required.
                    \`[arg]\` - optional.

					${this.client.commandHandler.modules
						.filter((x) => !x.ownerOnly)
						.map(
							(x) =>
								`\`${this.client.config.defaultPrefix}${x.aliases[0]} ${x.description.usage}\` - ${x.description.content}`
						)
						.join('\n')}
					`
		);

		return message.channel.send(embed);
	}
}
