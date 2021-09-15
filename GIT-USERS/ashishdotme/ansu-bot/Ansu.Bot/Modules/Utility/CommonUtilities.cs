using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ansu.Bot.Utils;
using Ansu.Service.Models;
using ColorHelper;
using DSharpPlus.CommandsNext;
using DSharpPlus.CommandsNext.Attributes;
using DSharpPlus.Entities;
using DSharpPlus.Interactivity;
using DSharpPlus.Interactivity.Extensions;
using Serilog;

namespace Ansu.Bot.Modules.Utility
{
    public class CommonUtilities : AnsuCommandModule
    {
        private readonly ILogger _logger;

        public CommonUtilities(ILogger logger)
        {
            _logger = logger;
        }

        [Command("meaning")]
        [Aliases("word", "dictionary", "dict")]
        [Description("Search for a term on dictionary.")]
        public async Task MeaningCommand(CommandContext ctx, [RemainingText][Description("The term you want to search for.")] string term)
        {
            if (string.IsNullOrWhiteSpace(term))
            {
                Error(ctx, null, $"Please enter the word");
            }

            var url = $"https://api.dictionaryapi.dev/api/v2/entries/en_US/{term}";
            try
            {
                var results = await JsonUtils.GetResponse<List<Word>>(url);
                var result = results.First();
                var pages = new List<Page>();
                for (var i = 0; i < result.Meanings.Count; i++)
                {
                    var definition = result.Meanings[i];
                    pages.Add(new Page("", new DiscordEmbedBuilder()
                        .WithTitle(term.ToUpper())
                        .WithColor(new DiscordColor(ColorGenerator.GetLightRandomColor<HEX>().ToString()))
                        .WithFooter(
                            $"Page {i + 1}/{result.Meanings.Count}",
                            null
                        )
                        .AddField("Meaning", $"{definition.Definitions.First().Definition}", false)
                        .AddField("Example", $"{definition.Definitions.First().Example}", false)));
                }

                if (result.Meanings.Count == 0)
                {
                    Error(ctx, null, $"No results found for \"{term}\".");
                }
                else
                {
                    await ctx.Channel.SendPaginatedMessageAsync(ctx.Member, pages);
                }
            } catch (Exception ex)
            {
                _logger.Error($"Dictionary exception : {ex.Message}");
                Error(ctx, null, $"No results found for \"{term}\".");
            }

        }
    }
}
