using Ansu.Bot.Modules;
using Ansu.Service.Interfaces;
using DSharpPlus;
using DSharpPlus.CommandsNext;
using DSharpPlus.CommandsNext.Attributes;
using DSharpPlus.Entities;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Ansu.Modules
{

    public class UserRoleCmds : AnsuCommandModule
    {
        private readonly DiscordClient _client;
        private readonly IGuildService _guildService;

        public UserRoleCmds(DiscordClient client, IGuildService guildService)
        {
            _client = client;
            _guildService = guildService;
        }

        [
            Command("verify"),
            Description("Gives you the verified role"),
        ]
        public async Task VerifiedRoleCmd(CommandContext ctx)
        {
            var guild = await _guildService.GetGuild(ctx.Guild.Id);
            if(guild.Configuration.Moderation.VerifiedRole == 0)
            {
                Error(ctx, null, "Verified role is not set");
            }
            if (guild.Configuration.Moderation.RolesChannel == 0)
            {
                Error(ctx, null, "Roles Channel is not set");
            }
            await GiveUserRolesAsync(ctx, guild.Configuration.Moderation.VerifiedRole);
        }

        public async Task GiveUserRolesAsync(CommandContext ctx, ulong roleId)
        {
            DiscordGuild guild = await _client.GetGuildAsync(ctx.Guild.Id);
            var guildSettings = await _guildService.GetGuild(ctx.Guild.Id);
            DiscordRole roleToGrant = guild.GetRole(roleId);
            await ctx.Member.GrantRoleAsync(roleToGrant);
            await ctx.Guild.GetChannel(guildSettings.Configuration.Moderation.RolesChannel).SendMessageAsync($"{ctx.User.Mention} has joined the {roleToGrant.Mention} role.");
        }

        public async Task RemoveUserRoleAsync(CommandContext ctx, ulong role)
        {
            // In case we ever decide to have indivdual commands to remove roles.
            await RemoveUserRolesAsync(ctx, x => (ulong)x.GetValue(Program.cfgjson.UserRoles, null) == role);
        }

        public async Task RemoveUserRolesAsync(CommandContext ctx, Func<System.Reflection.PropertyInfo, bool> predicate)
        {
            if (Program.cfgjson.UserRoles is null)
            {
                // Config hasn't been updated yet.
                return;
            }

            DiscordGuild guild = await _client.GetGuildAsync(ctx.Guild.Id);
            System.Reflection.PropertyInfo[] roleIds = Program.cfgjson.UserRoles.GetType().GetProperties().Where(predicate).ToArray();
            foreach (System.Reflection.PropertyInfo roleId in roleIds)
            {
                DiscordRole roleToGrant = guild.GetRole((ulong)roleId.GetValue(Program.cfgjson.UserRoles, null));
                await ctx.Member.RevokeRoleAsync(roleToGrant);
            }

            try
            {
                await ctx.Message.DeleteAsync();
            }
            catch
            {
                // Not an important exception to note.
            }
        }
    }
}
