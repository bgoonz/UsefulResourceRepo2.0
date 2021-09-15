using System;
using ColorHelper;
using DSharpPlus.Entities;

namespace Ansu.Bot.Utils
{
    public static class EmbedUtils
    {
        public static DiscordEmbedBuilder EmbedWithRandomColor(string title)
        {
            DiscordEmbedBuilder builder = new DiscordEmbedBuilder()
                .WithTitle(title)
                .WithColor(new DiscordColor(ColorGenerator.GetLightRandomColor<RGB>().ToString()));

            return builder;
        }
    }
}
