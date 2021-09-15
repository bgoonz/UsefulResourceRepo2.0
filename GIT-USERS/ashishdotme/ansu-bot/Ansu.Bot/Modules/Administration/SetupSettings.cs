using System;
using System.Threading.Tasks;
using Ansu.Bot.Setup;
using Ansu.Service.Interfaces;
using DSharpPlus.CommandsNext;
using DSharpPlus.CommandsNext.Attributes;
using DSharpPlus.Entities;
using DSharpPlus.Interactivity;
using DSharpPlus.Interactivity.Extensions;
using Serilog;

namespace Ansu.Bot.Modules.Administration
{
    public class SetupSettings : AnsuCommandModule
    {

        private readonly ILogger _logger;
        private readonly IGuildService _guildService;

        public SetupSettings(ILogger logger, IGuildService guildService)
        {
            _logger = logger;
            _guildService = guildService;
        }

        [Command("setup")]
        [Description("Starts an prompt for configuring the guild settings.")]
        public async Task SetupAsync(CommandContext ctx)
        {
                SettingsPrompt settingsPrompt = new SettingsPrompt(ctx, _logger, ctx.Client.GetInteractivity(), _guildService);
                try
                {
                    settingsPrompt.StartPromptAsync();
                }
                catch (Exception ex)
                {
                    _logger.Error($"Prompt Exception: {ex.Message}");
                }
                finally
                {
                    await settingsPrompt.EndPrompt();
                }
        }
    }
}
