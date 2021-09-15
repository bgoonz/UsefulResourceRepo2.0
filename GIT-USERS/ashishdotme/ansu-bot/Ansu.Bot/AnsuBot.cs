using System;
using System.Threading;
using System.Threading.Tasks;
using Ansu.Bot.EventHandlers;
using Ansu.Modules;
using DSharpPlus;
using DSharpPlus.CommandsNext;
using Microsoft.Extensions.Hosting;

namespace Ansu.Bot
{
    public class AnsuBot : BackgroundService
    {
        private readonly DiscordClient _discordClient;
        private readonly BotEventHandler _botEventHandler;
        private readonly ModCmds _modCmds;

        public AnsuBot(DiscordClient discordClient, BotEventHandler botEventHandler, ModCmds modCmds)
        {
            _discordClient = discordClient;
            _botEventHandler = botEventHandler;
            _modCmds = modCmds;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _discordClient.Ready += _botEventHandler.OnReady;
            _discordClient.MessageCreated += _botEventHandler.MessageCreated;
            _discordClient.GuildMemberAdded += _botEventHandler.GuildMemberAdded;
            _discordClient.GuildCreated += _botEventHandler.GuildCreated;
            _discordClient.MessageReactionAdded += _botEventHandler.OnReaction;
            _discordClient.GuildMemberUpdated += _botEventHandler.GuildMemberUpdated;
            _discordClient.UserUpdated += _botEventHandler.UserUpdated;
            await _discordClient.ConnectAsync();
            while (true)
            {
                await Task.Delay(10000);
                //_muteCmds.CheckMutesAsync();
                //_modCmds.CheckBansAsync();
                _modCmds.CheckRemindersAsync();
            }
        }
    }
}
