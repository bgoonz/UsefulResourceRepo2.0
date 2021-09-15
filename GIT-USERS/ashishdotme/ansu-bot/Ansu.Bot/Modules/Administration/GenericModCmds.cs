using Ansu.Bot.EventHandlers;
using Ansu.Redis.Client.Interfaces;
using Ansu.Service.Interfaces;
using Ansu.Service.Models;
using DSharpPlus;
using DSharpPlus.CommandsNext;
using DSharpPlus.CommandsNext.Attributes;
using DSharpPlus.Entities;
using Newtonsoft.Json;
using Serilog;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ansu.Modules
{

    public class ModCmds : BaseCommandModule
    {
        public const char dehoistCharacter = '\u17b5';
        private readonly IRedisClient _redisClient;
        private readonly IGuildService _guildService;
        private readonly DiscordClient _client;
        private readonly ILogger _logger;

        public ModCmds(IRedisClient redisClient, DiscordClient client, IGuildService guildService, ILogger logger)
        {
            _redisClient = redisClient;
            _client = client;
            _guildService = guildService;
            _logger = logger;
        }

        public async Task<bool> BanFromServerAsync(ulong targetUserId, string reason, ulong moderatorId, DiscordGuild guild, int deleteDays = 7, DiscordChannel channel = null, TimeSpan banDuration = default, bool appealable = false)
        {
            DiscordUser naughtyUser = await _client.GetUserAsync(targetUserId);
            bool permaBan = false;
            DiscordChannel logChannel = await _client.GetChannelAsync(Program.cfgjson.LogChannel);
            DiscordRole mutedRole = guild.GetRole(Program.cfgjson.MutedRole);
            DateTime? expireTime = DateTime.Now + banDuration;
            DiscordMember moderator = await guild.GetMemberAsync(moderatorId);

            if (banDuration == default)
            {
                permaBan = true;
                expireTime = null;
            }

            MemberPunishment newBan = new MemberPunishment()
            {
                MemberId = targetUserId,
                ModId = moderatorId,
                ServerId = guild.Id,
                ExpireTime = expireTime
            };

            await Program.db.HashSetAsync("bans", targetUserId, JsonConvert.SerializeObject(newBan));

            try
            {
                DiscordMember targetMember = await guild.GetMemberAsync(targetUserId);
                if (permaBan)
                {
                    if (appealable)
                    {
                        await targetMember.SendMessageAsync($"{Program.cfgjson.Emoji.Banned} You have been banned from **{guild.Name}**!\nReason: **{reason}**\nYou can appeal the ban here: <https://msft.chat/member/#ban-appeal-process>");
                    }
                    else
                    {
                        await targetMember.SendMessageAsync($"{Program.cfgjson.Emoji.Banned} You have been permanently banned from **{guild.Name}**!\nReason: **{reason}**");
                    }
                }
                else
                {
                    await targetMember.SendMessageAsync($"{Program.cfgjson.Emoji.Banned} You have been banned from **{guild.Name}** for {Warnings.TimeToPrettyFormat(banDuration, false)}!\nReason: **{reason}**");
                }
            }
            catch
            {
                // A DM failing to send isn't important.
            }

            try
            {
                await guild.BanMemberAsync(targetUserId, deleteDays, reason);
                if (permaBan)
                {
                    await logChannel.SendMessageAsync($"{Program.cfgjson.Emoji.Banned} <@{targetUserId}> was permanently banned by `{moderator.Username}#{moderator.Discriminator}` (`{moderatorId}`).\nReason: **{reason}**");
                }
                else
                {
                    await logChannel.SendMessageAsync($"{Program.cfgjson.Emoji.Banned} <@{targetUserId}> was banned for {Warnings.TimeToPrettyFormat(banDuration, false)} by `{moderator.Username}#{moderator.Discriminator}` (`{moderatorId}`).\nReason: **{reason}**");
                }

            }
            catch
            {
                return false;
            }
            return true;

        }

        public async Task UnbanFromServerAsync(DiscordGuild targetGuild, ulong targetUserId)
        {
            DiscordChannel logChannel = await _client.GetChannelAsync(Program.cfgjson.LogChannel);

            try
            {
                DiscordUser user = await _client.GetUserAsync(targetUserId);
                await targetGuild.UnbanMemberAsync(user, "Temporary ban expired");
            }
            catch
            {
                await logChannel.SendMessageAsync($"{Program.cfgjson.Emoji.Denied} Attempt to unban <@{targetUserId}> failed!\nMaybe they were already unbanned?");
            }
            // Even if the bot failed to unban, it reported that failure to a log channel and thus the ban record
            //  can be safely removed internally.
            await Program.db.HashDeleteAsync("bans", targetUserId);
        }

        public async Task<bool> CheckBansAsync()
        {
            DiscordChannel logChannel = await _client.GetChannelAsync(Program.cfgjson.LogChannel);
            Dictionary<string, MemberPunishment> banList = Program.db.HashGetAll("bans").ToDictionary(
                x => x.Name.ToString(),
                x => JsonConvert.DeserializeObject<MemberPunishment>(x.Value)
            );
            if (banList == null | banList.Keys.Count == 0)
                return false;
            else
            {
                // The success value will be changed later if any of the unmutes are successful.
                bool success = false;
                foreach (KeyValuePair<string, MemberPunishment> entry in banList)
                {
                    MemberPunishment banEntry = entry.Value;
                    DiscordGuild targetGuild = await _client.GetGuildAsync(banEntry.ServerId);
                    if (DateTime.Now > banEntry.ExpireTime)
                    {
                        targetGuild = await _client.GetGuildAsync(banEntry.ServerId);
                        await UnbanFromServerAsync(targetGuild, banEntry.MemberId);
                        success = true;

                    }

                }
#if DEBUG
                Console.WriteLine($"Checked bans at {DateTime.Now} with result: {success}");
#endif
                return success;
            }
        }


        // If invoker is allowed to mod target.
        public static bool AllowedToMod(DiscordMember invoker, DiscordMember target)
        {
            return GetHier(invoker) > GetHier(target);
        }

        public static int GetHier(DiscordMember target)
        {
            return target.IsOwner ? int.MaxValue : (target.Roles.Count() == 0 ? 0 : target.Roles.Max(x => x.Position));
        }

        public static TimeSpan ParseTime(char possibleTimePeriod, int timeLength)
        {
            switch (possibleTimePeriod)
            {
                // Seconds
                case 's':
                    return TimeSpan.FromSeconds(timeLength);
                // Minutes
                case 'm':
                    return TimeSpan.FromMinutes(timeLength);
                // Hours
                case 'h':
                    return TimeSpan.FromHours(timeLength);
                // Days
                case 'd':
                    return TimeSpan.FromDays(timeLength);
                // Weeks
                case 'w':
                    return TimeSpan.FromDays(timeLength * 7);
                // Months
                case 'q':
                    return TimeSpan.FromDays(timeLength * 28);
                // Years
                case 'y':
                    return TimeSpan.FromDays(timeLength * 365);
                default:
                    return default;
            }
        }

        [Command("lockdown")]
        [Aliases("lock")]
        [Description("Locks the current channel, preventing any new messages. See also: unlock")]
        [HomeServer, RequireHomeserverPerm(ServerPermLevel.Mod), RequireBotPermissions(Permissions.ManageChannels)]
        public async Task LockdownCommand(CommandContext ctx, [RemainingText] string reason = "")
        {
            var currentChannel = ctx.Channel;
            if (!Program.cfgjson.LockdownEnabledChannels.Contains(currentChannel.Id))
            {
                await ctx.Channel.SendMessageAsync($"{Program.cfgjson.Emoji.Denied} You can't lock or unlock this channel!\nIf this is in error, add its ID (`{currentChannel.Id}`) to the lockdown whitelist.");
                return;
            }

            await ctx.Message.DeleteAsync();

            await currentChannel.AddOverwriteAsync(ctx.Guild.CurrentMember, Permissions.SendMessages, Permissions.None, "Failsafe 1 for Lockdown");
            await currentChannel.AddOverwriteAsync(ctx.Guild.GetRole(Program.cfgjson.ModRole), Permissions.SendMessages, Permissions.None, "Failsafe 2 for Lockdown");
            await currentChannel.AddOverwriteAsync(ctx.Guild.EveryoneRole, Permissions.None, Permissions.SendMessages, "Lockdown command");

            if (reason == "")
                await ctx.Channel.SendMessageAsync($"{Program.cfgjson.Emoji.Locked} This channel has been locked by a Moderator.");
            else
                await ctx.Channel.SendMessageAsync($"{Program.cfgjson.Emoji.Locked} This channel has been locked: **{reason}**");
        }

        [Command("unlock")]
        [Description("Unlocks a previously locked channel. See also: lockdown")]
        [Aliases("unlockdown"), HomeServer, RequireHomeserverPerm(ServerPermLevel.Mod), RequireBotPermissions(Permissions.ManageChannels)]
        public async Task UnlockCommand(CommandContext ctx, [RemainingText] string reason = "")
        {
            var currentChannel = ctx.Channel;
            if (!Program.cfgjson.LockdownEnabledChannels.Contains(currentChannel.Id))
            {
                await ctx.Channel.SendMessageAsync($"{Program.cfgjson.Emoji.Denied} You can't lock or unlock this channel!\nIf this is in error, add its ID (`{currentChannel.Id}`) to the lockdown whitelist.");
                return;
            }

            bool success = false;
            var permissions = currentChannel.PermissionOverwrites.ToArray();
            foreach (var permission in permissions)
            {
                if (permission.Type == DSharpPlus.OverwriteType.Role)
                {
                    var role = await permission.GetRoleAsync();
                    if (
                        (role == ctx.Guild.EveryoneRole
                        && permission.Denied == Permissions.SendMessages)
                        ||
                        (role == ctx.Guild.GetRole(Program.cfgjson.ModRole)
                        && permission.Allowed == Permissions.SendMessages
                        )
                        )
                    {
                        success = true;
                        await permission.DeleteAsync();
                    }
                }
                else
                {
                    var member = await permission.GetMemberAsync();
                    if ((member == ctx.Member || member == ctx.Guild.CurrentMember) && permission.Allowed == Permissions.SendMessages)
                    {
                        success = true;
                        await permission.DeleteAsync();
                    }

                }
            }

            if (success)
                await ctx.RespondAsync($"{Program.cfgjson.Emoji.Success} This channel has been unlocked!");
            else
                await ctx.RespondAsync($"{Program.cfgjson.Emoji.Error} This channel is not locked.");
        }

        [Command("ban")]
        [Aliases("tempban")]
        [Description("Bans a user that you have permssion to ban, deleting all their messages in the process. See also: bankeep.")]
        [HomeServer, RequireHomeserverPerm(ServerPermLevel.Mod), RequirePermissions(Permissions.BanMembers)]
        public async Task BanCmd(CommandContext ctx,
            [Description("The user you wish to ban. Accepts many formats")] DiscordUser targetMember,
            [RemainingText, Description("The time and reason for the ban. e.g. '14d trolling'")] string timeAndReason = "No reason specified.")
        {
            bool appealable = false;
            TimeSpan banDuration = default;
            string possibleTime = timeAndReason.Split(' ').First();
            if (possibleTime.Length != 1)
            {
                string reason = timeAndReason;
                // Everything BUT the last character should be a number.
                string possibleNum = possibleTime.Remove(possibleTime.Length - 1);
                if (int.TryParse(possibleNum, out int timeLength))
                {
                    char possibleTimePeriod = possibleTime.Last();
                    banDuration = ParseTime(possibleTimePeriod, timeLength);
                }
                else
                {
                    banDuration = default;
                }

                if (banDuration != default || possibleNum == "0")
                {
                    if (!timeAndReason.Contains(" "))
                        reason = "No reason specified.";
                    else
                    {
                        reason = timeAndReason.Substring(timeAndReason.IndexOf(' ') + 1, timeAndReason.Length - (timeAndReason.IndexOf(' ') + 1));
                    }
                }

                // await ctx.Channel.SendMessageAsync($"debug: {possibleNum}, {possibleTime}, {banDuration.ToString()}, {reason}");
                if (reason.Length > 6 && reason.Substring(0, 7) == "appeal ")
                {
                    appealable = true;
                    reason = reason[7..^0];
                }

                DiscordMember member;
                try
                {
                    member = await ctx.Guild.GetMemberAsync(targetMember.Id);
                }
                catch
                {
                    member = null;
                }

                if (member == null)
                {
                    await ctx.Message.DeleteAsync();
                    await BanFromServerAsync(targetMember.Id, reason, ctx.User.Id, ctx.Guild, 7, ctx.Channel, banDuration, appealable);
                }
                else
                {
                    if (AllowedToMod(ctx.Member, member))
                    {
                        if (AllowedToMod(await ctx.Guild.GetMemberAsync(ctx.Client.CurrentUser.Id), member))
                        {
                            await ctx.Message.DeleteAsync();
                            await BanFromServerAsync(targetMember.Id, reason, ctx.User.Id, ctx.Guild, 7, ctx.Channel, banDuration, appealable);
                        }
                        else
                        {
                            await ctx.Channel.SendMessageAsync($"{Program.cfgjson.Emoji.Error} {ctx.User.Mention}, I don't have permission to ban **{targetMember.Username}#{targetMember.Discriminator}**!");
                            return;
                        }
                    }
                    else
                    {
                        await ctx.Channel.SendMessageAsync($"{Program.cfgjson.Emoji.Error} {ctx.User.Mention}, you don't have permission to ban **{targetMember.Username}#{targetMember.Discriminator}**!");
                        return;
                    }
                }
                reason = reason.Replace("`", "\\`").Replace("*", "\\*");
                if (banDuration == default)
                    await ctx.Channel.SendMessageAsync($"{Program.cfgjson.Emoji.Banned} {targetMember.Mention} has been banned: **{reason}**");
                else
                    await ctx.Channel.SendMessageAsync($"{Program.cfgjson.Emoji.Banned} {targetMember.Mention} has been banned for **{Warnings.TimeToPrettyFormat(banDuration, false)}**: **{reason}**");
            }
        }

        /// I CANNOT find a way to do this as alias so I made it a separate copy of the command.
        /// Sue me, I beg you.
        [Command("bankeep")]
        [Aliases("bansave")]
        [Description("Bans a user but keeps their messages around."), HomeServer, RequireHomeserverPerm(ServerPermLevel.Mod), RequirePermissions(Permissions.BanMembers)]
        public async Task BankeepCmd(CommandContext ctx, DiscordUser targetMember, [RemainingText] string timeAndReason = "No reason specified.")
        {
            bool appealable = false;
            TimeSpan banDuration = default;
            string possibleTime = timeAndReason.Split(' ').First();
            if (possibleTime.Length != 1)
            {
                string reason = timeAndReason;
                // Everything BUT the last character should be a number.
                string possibleNum = possibleTime.Remove(possibleTime.Length - 1);
                if (int.TryParse(possibleNum, out int timeLength))
                {
                    char possibleTimePeriod = possibleTime.Last();
                    banDuration = ParseTime(possibleTimePeriod, timeLength);
                }
                else
                {
                    banDuration = default;
                }

                if (banDuration != default || possibleNum == "0")
                {
                    if (!timeAndReason.Contains(" "))
                        reason = "No reason specified.";
                    else
                    {
                        reason = timeAndReason.Substring(timeAndReason.IndexOf(' ') + 1, timeAndReason.Length - (timeAndReason.IndexOf(' ') + 1));
                    }
                }

                // await ctx.Channel.SendMessageAsync($"debug: {possibleNum}, {possibleTime}, {banDuration.ToString()}, {reason}");
                if (reason.Length > 6 && reason.Substring(0, 7) == "appeal ")
                {
                    appealable = true;
                    reason = reason[7..^0];
                }

                DiscordMember member;
                try
                {
                    member = await ctx.Guild.GetMemberAsync(targetMember.Id);
                }
                catch
                {
                    member = null;
                }

                if (member == null)
                {
                    await ctx.Message.DeleteAsync();
                    await BanFromServerAsync(targetMember.Id, reason, ctx.User.Id, ctx.Guild, 0, ctx.Channel, banDuration, appealable);
                }
                else
                {
                    if (AllowedToMod(ctx.Member, member))
                    {
                        if (AllowedToMod(await ctx.Guild.GetMemberAsync(ctx.Client.CurrentUser.Id), member))
                        {
                            await ctx.Message.DeleteAsync();
                            await BanFromServerAsync(targetMember.Id, reason, ctx.User.Id, ctx.Guild, 0, ctx.Channel, banDuration, appealable);
                        }
                        else
                        {
                            await ctx.Channel.SendMessageAsync($"{Program.cfgjson.Emoji.Error} {ctx.User.Mention}, I don't have permission to ban **{targetMember.Username}#{targetMember.Discriminator}**!");
                            return;
                        }
                    }
                    else
                    {
                        await ctx.Channel.SendMessageAsync($"{Program.cfgjson.Emoji.Error} {ctx.User.Mention}, you don't have permission to ban **{targetMember.Username}#{targetMember.Discriminator}**!");
                        return;
                    }
                }
                reason = reason.Replace("`", "\\`").Replace("*", "\\*");
                if (banDuration == default)
                    await ctx.Channel.SendMessageAsync($"{Program.cfgjson.Emoji.Banned} {targetMember.Mention} has been banned: **{reason}**");
                else
                    await ctx.Channel.SendMessageAsync($"{Program.cfgjson.Emoji.Banned} {targetMember.Mention} has been banned for **{Warnings.TimeToPrettyFormat(banDuration, false)}**: **{reason}**");
            }
        }

        [Command("kick")]
        [Aliases("yeet", "shoo", "goaway")]
        [Description("Kicks a user, removing them from the server until they rejoin. Generally not very useful.")]
        [RequirePermissions(Permissions.KickMembers), HomeServer, RequireHomeserverPerm(ServerPermLevel.Mod)]
        public async Task Kick(CommandContext ctx, DiscordUser target, [RemainingText] string reason = "No reason specified.")
        {
            reason = reason.Replace("`", "\\`").Replace("*", "\\*");

            DiscordMember member;
            try
            {
                member = await ctx.Guild.GetMemberAsync(target.Id);
            }
            catch
            {
                await ctx.Channel.SendMessageAsync($"{ctx.User.Mention}, that user doesn't appear to be in the server.");
                return;
            }

            if (AllowedToMod(ctx.Member, member))
            {
                if (AllowedToMod(await ctx.Guild.GetMemberAsync(ctx.Client.CurrentUser.Id), member))
                {
                    await ctx.Message.DeleteAsync();
                    await KickAndLogAsync(member, reason, ctx.Member);
                    await ctx.Channel.SendMessageAsync($"{Program.cfgjson.Emoji.Ejected} {target.Mention} has been kicked: **{reason}**");
                    return;
                }
                else
                {
                    await ctx.Channel.SendMessageAsync($"{Program.cfgjson.Emoji.Error} I don't have permission to kick **{target.Username}#{target.Discriminator}**!");
                    return;
                }
            }
            else
            {
                await ctx.Channel.SendMessageAsync($"{Program.cfgjson.Emoji.Error} You aren't allowed to kick **{target.Username}#{target.Discriminator}**!");
                return;
            }
        }

        [Command("unban")]
        [HomeServer, RequireHomeserverPerm(ServerPermLevel.Mod), RequirePermissions(Permissions.BanMembers)]
        public async Task UnmuteCmd(CommandContext ctx, DiscordUser targetUser)
        {
            DiscordChannel logChannel = await _client.GetChannelAsync(Program.cfgjson.LogChannel);

            if ((await Program.db.HashExistsAsync("bans", targetUser.Id)))
            {
                await UnbanUserAsync(ctx.Guild, targetUser);
                await ctx.RespondAsync($"{Program.cfgjson.Emoji.Unbanned} Successfully unbanned **{targetUser.Username}#{targetUser.Discriminator}**.");
            }
            else
            {
                bool banSuccess = await UnbanUserAsync(ctx.Guild, targetUser);
                if (banSuccess)
                    await ctx.RespondAsync($"{Program.cfgjson.Emoji.Unbanned} Successfully unbanned **{targetUser.Username}#{targetUser.Discriminator}**.");
                else
                {
                    await ctx.RespondAsync($"{Program.cfgjson.Emoji.Error} {ctx.Member.Mention}, that user doesn't appear to be banned, *and* an error ocurred while attempting to unban them anyway.\nPlease contact the bot owner if this wasn't expected, the error has been logged.");
                }
            }
        }

        [Command("dehoist")]
        [Description("Adds an invisible character to someones nickname that drops them to the bottom of the member list. Accepts multiple members.")]
        [HomeServer, RequireHomeserverPerm(ServerPermLevel.TrialMod)]
        public async Task Dehoist(CommandContext ctx, [Description("List of server members to dehoist")] params DiscordMember[] discordMembers)
        {
            if (discordMembers.Length == 0)
            {
                await ctx.RespondAsync($"{Program.cfgjson.Emoji.Error} You need to tell me who to dehoist!");
                return;
            }
            else if (discordMembers.Length == 1)
            {
                if (discordMembers[0].DisplayName[0] == dehoistCharacter)
                {
                    await ctx.RespondAsync($"{Program.cfgjson.Emoji.Error} {discordMembers[0].Mention} is already dehoisted!");
                    return;
                }
                try
                {
                    await discordMembers[0].ModifyAsync(a =>
                    {
                        a.Nickname = DehoistName(discordMembers[0].DisplayName);
                    });
                    await ctx.RespondAsync($"{Program.cfgjson.Emoji.Success} Successfully dehoisted {discordMembers[0].Mention}!");
                }
                catch
                {
                    await ctx.RespondAsync($"{Program.cfgjson.Emoji.Error} Failed to dehoist {discordMembers[0].Mention}!");
                }
                return;
            }

            var msg = await ctx.RespondAsync($"{Program.cfgjson.Emoji.Loading} Working on it...");
            int failedCount = 0;

            foreach (DiscordMember discordMember in discordMembers)
            {
                var origName = discordMember.DisplayName;
                if (origName[0] == '\u17b5')
                {
                    failedCount++;
                }
                else
                {
                    try
                    {
                        await discordMember.ModifyAsync(a =>
                        {
                            a.Nickname = DehoistName(origName);
                        });
                    }
                    catch
                    {
                        failedCount++;
                    }
                }

            }
            await msg.ModifyAsync($"{Program.cfgjson.Emoji.Success} Successfully dehoisted {discordMembers.Count() - failedCount} of {discordMembers.Count()} member(s)! (Check Audit Log for details)");
        }

        [Command("massdehoist")]
        [Description("Dehoist everyone on the server who has a bad name. WARNING: This is a computationally expensive operation.")]
        [HomeServer, RequireHomeserverPerm(ServerPermLevel.Mod)]
        public async Task MassDehoist(CommandContext ctx)
        {
            var msg = await ctx.RespondAsync($"{Program.cfgjson.Emoji.Loading} Working on it. This will take a while.");
            var discordMembers = await ctx.Guild.GetAllMembersAsync();
            int failedCount = 0;

            foreach (DiscordMember discordMember in discordMembers)
            {
                bool success = await BotEventHandler.CheckAndDehoistMemberAsync(discordMember);
                if (!success)
                    failedCount++;
            }
            await msg.ModifyAsync($"{Program.cfgjson.Emoji.Success} Successfully dehoisted {discordMembers.Count() - failedCount} of {discordMembers.Count()} member(s)! (Check Audit Log for details)");
        }


        public static string DehoistName(string origName)
        {
            if (origName.Length == 32)
            {
                origName = origName[0..^1];
            }
            return dehoistCharacter + origName;
        }

        public async Task<bool> UnbanUserAsync(DiscordGuild guild, DiscordUser target)
        {
            DiscordChannel logChannel = await _client.GetChannelAsync(Program.cfgjson.LogChannel);
            try
            {
                await guild.UnbanMemberAsync(target);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
                return false;
            }
            await logChannel.SendMessageAsync($"{Program.cfgjson.Emoji.Unbanned} Successfully unbanned <@{target.Id}>!");
            await Program.db.HashDeleteAsync("bans", target.Id.ToString());
            return true;
        }

        public async Task KickAndLogAsync(DiscordMember target, string reason, DiscordMember moderator)
        {
            DiscordChannel logChannel = await _client.GetChannelAsync(Program.cfgjson.LogChannel);
            await target.RemoveAsync(reason);
            await logChannel.SendMessageAsync($"{Program.cfgjson.Emoji.Ejected} <@{target.Id}> was kicked by `{moderator.Username}#{moderator.Discriminator}` (`{moderator.Id}`).\nReason: **{reason}**");
        }

        [Command("tellraw")]
        [HomeServer, RequireHomeserverPerm(ServerPermLevel.Mod)]
        public async Task TellRaw(CommandContext ctx, DiscordChannel discordChannel, [RemainingText] string output)
        {
            try
            {
                await discordChannel.SendMessageAsync(output);
            }
            catch
            {
                await ctx.Channel.SendMessageAsync($"{Program.cfgjson.Emoji.Error} Your dumb message didn't want to send. Congrats, I'm proud of you.");
                return;
            }
            await ctx.Channel.SendMessageAsync($"{Program.cfgjson.Emoji.Success} I sent your stupid message to {discordChannel.Mention}.");

        }


        [Command("remindme")]
        [Aliases("reminder")]
        [HomeServer, RequireHomeserverPerm(ServerPermLevel.Tier4)]
        public async Task RemindMe(CommandContext ctx, string timetoParse, [RemainingText] string reminder)
        {
            DateTime t = HumanDateParser.HumanDateParser.Parse(timetoParse).ToLocalTime();
            if (t <= DateTime.Now)
            {
                await ctx.Channel.SendMessageAsync($"{Program.cfgjson.Emoji.Error} Time can't be in the past!");
                return;
            }
            else if (t < (DateTime.Now + TimeSpan.FromSeconds(59)))
            {
                await ctx.Channel.SendMessageAsync($"{Program.cfgjson.Emoji.Error} Time must be at least a minute in the future!");
                return;
            }

            var reminderObject = new Reminder()
            {
                Id = Guid.NewGuid().ToString("N"),
                ServerID = ctx.Guild.Id,
                UserID = ctx.User.Id,
                ChannelID = ctx.Channel.Id,
                MessageLink = $"https://discord.com/channels/{ctx.Guild.Id}/{ctx.Channel.Id}/{ctx.Message.Id}",
                ReminderText = reminder,
                ReminderTime = t,
                OriginalTime = DateTime.Now
            };

            var guild = await _guildService.GetGuild(ctx.Guild.Id);
            guild.Reminders.Add(reminderObject);
            await _guildService.UpdateGuild(guild);
            await ctx.Channel.SendMessageAsync($"{Program.cfgjson.Emoji.Success} I'll try my best to remind you about that at: `{t}` (In roughly **{Warnings.TimeToPrettyFormat(t.Subtract(ctx.Message.Timestamp.DateTime), false)}**)");
        }

        public async Task<bool> CheckRemindersAsync(bool includeRemutes = false)
        {
            bool success = false;
            var guilds = await _guildService.GetAllGuilds();
            var reminders = guilds.Select(x => x.Reminders).ToList().First();
            foreach (var reminder in reminders)
            {
                var guild = await _client.GetGuildAsync(reminder.ServerID);
                if (reminder.ReminderTime.ToLocalTime() <= DateTime.Now)
                {
                    var user = await _client.GetUserAsync(reminder.UserID);
                    DiscordChannel channel = null;
                    try
                    {
                        channel = await _client.GetChannelAsync(reminder.ChannelID);
                    }
                    catch
                    {
                        // channel likely doesnt exist
                    }
                    if (channel == null)
                    {
                        var member = await guild.GetMemberAsync(reminder.UserID);
                        if (Warnings.GetPermLevel(member) >= ServerPermLevel.TrialMod)
                        {
                            channel = await _client.GetChannelAsync(Program.cfgjson.HomeChannel);
                        }
                        else
                        {
                            channel = await _client.GetChannelAsync(240528256292356096);
                        }
                    }

                    var guildData = guilds.Find(x => x.Id == reminder.ServerID);
                    guildData.Reminders = guildData.Reminders.FindAll(x => x.Id != reminder.Id);
                    await _guildService.UpdateGuild(guildData);

                    //await Program.db.ListRemoveAsync("reminders", JsonConvert.SerializeObject(reminder));
                    success = true;

                    var embed = new DiscordEmbedBuilder()
                    .WithDescription(reminder.ReminderText)
                    .WithColor(new DiscordColor(0xD084))
                    .WithFooter(
                        "Reminder was set",
                        null
                    )
                    .WithTimestamp(reminder.OriginalTime)
                    .WithAuthor(
                        $"Reminder from {Warnings.TimeToPrettyFormat(DateTime.Now.Subtract(reminder.OriginalTime), true)}",
                        null,
                        user.AvatarUrl
                    )
                    .AddField("Context", $"[`Jump to context`]({reminder.MessageLink})", true);

                    await channel.SendMessageAsync($"<@!{reminder.UserID}>, you asked to be reminded of something:", embed);
                }

            }
            return success;
        }



        [Group("debug")]
        [Aliases("troubleshoot", "unbug", "bugn't", "helpsomethinghasgoneverywrong")]
        [Description("Commands and things for fixing the bot in the unlikely event that it breaks a bit.")]
        class DebugCmds : BaseCommandModule
        {
            private readonly ModCmds _modCmds;

            public DebugCmds(ModCmds modCmds)
            {
                _modCmds = modCmds;
            }

            [Command("mutes")]
            [Description("Debug the list of mutes.")]
            public async Task MuteDebug(CommandContext ctx)
            {
                string strOut = "```json";
                var muteList = Program.db.HashGetAll("mutes").ToDictionary();
                if (muteList == null | muteList.Keys.Count == 0)
                {
                    await ctx.Channel.SendMessageAsync("No mutes found in database!");
                    return;
                }
                else
                {
                    foreach (var entry in muteList)
                    {
                        strOut += $"\n{entry.Value}";
                    }
                }
                strOut += "```";
                await ctx.Channel.SendMessageAsync(strOut);
            }

            [Command("bans")]
            [Description("Debug the list of bans.")]
            public async Task BanDebug(CommandContext ctx)
            {
                string strOut = "```json";
                var muteList = Program.db.HashGetAll("bans").ToDictionary();
                if (muteList == null | muteList.Keys.Count == 0)
                {
                    await ctx.Channel.SendMessageAsync("No bans found in database!");
                    return;
                }
                else
                {
                    foreach (var entry in muteList)
                    {
                        strOut += $"\n{entry.Value}";
                    }
                }
                strOut += "```";
                await ctx.RespondAsync(strOut);
            }

            [Command("restart")]
            [RequireHomeserverPerm(ServerPermLevel.Admin), Description("Restart the bot")]
            public async Task Restart(CommandContext ctx)
            {
                await ctx.RespondAsync("Now restarting bot.");
                Environment.Exit(1);
            }

            [Command("shutdown")]
            [RequireHomeserverPerm(ServerPermLevel.Admin), Description("Panics and shuts the bot down. Check the arguments for usage.")]
            public async Task Shutdown(CommandContext ctx, [Description("This MUST be set to \"I understand what I am doing\" for the command to work."), RemainingText] string verificationArgument)
            {
                if (verificationArgument == "I understand what I am doing")
                {
                    await ctx.RespondAsync("WARNING: The bot is now shutting down. This action is permanent.");
                    Environment.Exit(0);
                }
                else
                {
                    await ctx.RespondAsync("Invalid argument. Make sure you know what you are doing.");

                };

            }
            [Command("refresh")]
            public async Task Refresh(CommandContext ctx)
            {
                var msg = await ctx.RespondAsync("Checking for pending unmutes and unbans...");
                bool bans = await _modCmds.CheckBansAsync();
                bool mutes = true;
                bool reminders = await _modCmds.CheckRemindersAsync();
                await msg.ModifyAsync($"Unban check result: `{bans.ToString()}`\nUnmute check result: `{mutes.ToString()}`\nReminders check result: `{reminders}`");
            }
        }

    }
}
