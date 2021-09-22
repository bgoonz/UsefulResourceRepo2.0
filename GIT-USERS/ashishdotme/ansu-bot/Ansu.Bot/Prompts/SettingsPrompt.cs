using System;
using System.Threading.Tasks;
using Ansu.Bot.Exceptions;
using Ansu.Bot.Modules;
using Ansu.Bot.Utils;
using Ansu.Service.Interfaces;
using Ansu.Service.Models;
using ColorHelper;
using DSharpPlus.CommandsNext;
using DSharpPlus.CommandsNext.Attributes;
using DSharpPlus.Entities;
using DSharpPlus.Interactivity;
using DSharpPlus.Interactivity.Extensions;
using Serilog;

namespace Ansu.Bot.Setup
{
    public class SettingsPrompt : PromptBase
    {
        private readonly IGuildService _guildService;
        public SettingsPrompt(CommandContext ctx, ILogger logger, InteractivityExtension interactivityExtension, IGuildService guildService) : base(ctx, logger, interactivityExtension)
        {
            _guildService = guildService;
        }

        protected override async Task Steps()
        {
            string reply = string.Empty;
            _currentStep = await FirstStep("Bot Settings", "Do you want to setup  bot", (context) => onReply(context, ref reply));

            if (string.IsNullOrEmpty(reply))
            {
                await EndPrompt();
                Error(_ctx, null, "Prompt stopped");
                return;
            }

            var moderationOptions = new ModerationOptions()
            {
                LogChannel = 0
            };

            var embed = EmbedWithTitle("Log channel")
                .WithFooter(Constants.PROMPT_END_MESSAGE)
                .WithDescription("Enter channel for posting logs\n\n");

            _currentStep = await NextStep(_currentStep, embed.Build());

            var locChannel = await _ctx.Message.GetNextMessageAsync();
            if (locChannel.TimedOut)
            {   
                Error(_ctx, "k", $"Prompt timed out");
                throw new AnsuBotException("Timed out");
            }

            moderationOptions.LogChannel = ulong.Parse(locChannel.Result.Content.Trim());

            var verifiedRoleEmbed = EmbedWithTitle("Verified Role")
                .WithFooter(Constants.PROMPT_END_MESSAGE)
                .WithDescription("Enter verified role ID\n\n");

            _currentStep = await NextStep(_currentStep, verifiedRoleEmbed.Build());

            var verifiedRole = await _ctx.Message.GetNextMessageAsync();
            if (verifiedRole.TimedOut)
            {
                Error(_ctx, "k", $"Prompt timed out");
                throw new AnsuBotException("Timed out");
            }

            moderationOptions.VerifiedRole = ulong.Parse(verifiedRole.Result.Content.Trim());

            var guild = await _guildService.GetGuild(_ctx.Guild.Id);
            guild.Configuration.Moderation = moderationOptions;
            await _guildService.UpdateGuild(guild);

            await EndPrompt();

            DiscordEmbedBuilder builder = new DiscordEmbedBuilder()
                   .WithTitle("Bot Settings")
                   .WithDescription("All done!")
                   .WithColor(new DiscordColor(ColorGenerator.GetLightRandomColor<HEX>().ToString()));

            await _channel.SendMessageAsync(embed: builder.Build());

        }
    }
}
