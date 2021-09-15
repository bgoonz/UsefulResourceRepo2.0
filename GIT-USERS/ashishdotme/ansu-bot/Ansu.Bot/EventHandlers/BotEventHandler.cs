using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Ansu.Bot.Service.Models;
using Ansu.Modules;
using Ansu.Redis.Client.Interfaces;
using Ansu.Service.Interfaces;
using Ansu.Service.Models;
using DSharpPlus;
using DSharpPlus.Entities;
using DSharpPlus.EventArgs;
using Serilog;

namespace Ansu.Bot.EventHandlers
{
    public class BotEventHandler
    {
        //private static EventId EventId { get; } = new(1000, Program.cfgjson.Name);
        private readonly DiscordClient _client;
        private readonly Warnings _warnings;
        private readonly IRedisClient _redisClient;
        private readonly IGuildService _guildService;
        private readonly ModCmds _modCmds;
        private readonly MuteCmds _muteCmds;
        public static DiscordChannel logChannel;
        public static DiscordChannel badMsgLog;
        readonly ILogger _logger;
        public static List<ulong> processedMessages = new List<ulong>();
        public static Dictionary<string, string[]> wordLists = new Dictionary<string, string[]>();
        readonly static Regex emoji_rx = new Regex("((\u203c|\u2049|\u2139|[\u2194-\u2199]|[\u21a9-\u21aa]|[\u231a-\u231b]|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\u24c2|[\u25aa–\u25ab]|\u25b6|\u25c0|[\u25fb–\u25fe]|[\u2600–\u2604]|\u260E|\u2611|[\u2614–\u2615]|\u2618|\u261D|\u2620|[\u2622–\u2623]|\u2626|\u262A|[\u262E–\u262F]|[\u2638–\u263A]|\u2640|\u2642|[\u2648–\u2653]|[\u265F–\u2660]|\u2663|[\u2665–\u2666]|\u2668|\u267B|[\u267E–\u267F]|[\u2692–\u2697]|\u2699|[\u269B–\u269C]|[\u26A0–\u26A1]|\u26A7|[\u26AA–\u26AB]|[\u26B0–\u26B1]|[\u26BD–\u26BE]|[\u26C4–\u26C5]|\u26C8|[\u26CE–\u26CF]|\u26D1|[\u26D3–\u26D4]|[\u26E9–\u26EA]|[\u26F0–\u26F5]|[\u26F7–\u26FA]|\u26FD|\u2702|\u2705|[\u2708–\u270D]|\u270F|\u2712|\u2714|\u2716|\u271D|\u2721|\u2728|[\u2733–\u2734]|\u2744|\u2747|\u274C|\u274E|[\u2753–\u2755]|\u2757|[\u2763–\u2764]|[\u2795–\u2797]|\u27A1|\u27B0|\u27BF|[\u2934–\u2935]|[\u2B05–\u2B07]|[\u2B1B–\u2B1C]|\u2B50|\u2B55|\u3030|\u303D|\u3297|\u3299|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]))|(<a{0,1}:[a-zA-Z0-9_.]{2,32}:[0-9]+>)");

#pragma warning disable CS4014 // Because this call is not awaited, execution of the current method continues before the call is completed

        public BotEventHandler(IRedisClient redisClient, ModCmds modCmds, DiscordClient client, IGuildService guildService, Warnings warnings, ILogger logger, MuteCmds muteCmds)
        {
            _redisClient = redisClient;
            _guildService = guildService;
            _modCmds = modCmds;
            _muteCmds = muteCmds;
            _logger = logger;
            _warnings = warnings;
            _client = client;
        }

        public async Task OnReady(DiscordClient client, ReadyEventArgs e)
        {
            _logger.Information($"Logged in as {client.CurrentUser.Username}#{client.CurrentUser.Discriminator}");
            //logChannel = await _client.GetChannelAsync(Program.cfgjson.LogChannel);
            //badMsgLog = await _client.GetChannelAsync(Program.cfgjson.InvestigationsChannelId);

            //Mutes.CheckMutesAsync();
            //_modCmds.CheckBansAsync();
            //_modCmds.CheckRemindersAsync();

            //string commitHash = "aaaaaaa";
            //string commitMessage = "N/A";
            //string commitTime = "0000-00-00 00:00:00 +0000";
            //if (File.Exists("CommitHash.txt"))
            //{
            //    using var sr = new StreamReader("CommitHash.txt");
            //    commitHash = sr.ReadToEnd();
            //}

            //if (File.Exists("CommitMessage.txt"))
            //{
            //    using var sr = new StreamReader("CommitMessage.txt");
            //    commitMessage = sr.ReadToEnd();
            //}

            //if (File.Exists("CommitTime.txt"))
            //{
            //    using var sr = new StreamReader("CommitTime.txt");
            //    commitTime = sr.ReadToEnd();
            //}
            //Guild guild = new Guild();
            //guild.Id = client.CurrentUser.Id;
            //guild.OwnerId = client.CurrentUser.Id;
            //guild.Configuration = new GuildConfiguration
            //{
            //    Moderation = new ModerationOptions
            //    {
            //        MassEmojiThreshold = 6,
            //        Blacklist = new List<string>()
            //    }
            //};

            //while (true)
            //{
            //    await Task.Delay(10000);
            //    //_muteCmds.CheckMutesAsync();
            //    //_modCmds.CheckBansAsync();
            //    _modCmds.CheckRemindersAsync();
            //}
        }

        public async Task MessageCreated(DiscordClient client, MessageCreateEventArgs e)
        {
            if (e.Channel.IsPrivate || e.Guild.Id != Program.cfgjson.ServerID || e.Author.IsBot)
                return;

            if (processedMessages.Contains(e.Message.Id))
            {
                return;
            }
            else
            {
                processedMessages.Add(e.Message.Id);
            }

            DiscordMember member = await e.Guild.GetMemberAsync(e.Author.Id);
            if (Warnings.GetPermLevel(member) >= ServerPermLevel.TrialMod)
            {
                return;
            }


            bool match = false;

            // Matching word list
            var wordListKeys = Program.cfgjson.WordListList.Keys;
            foreach (string key in wordListKeys)
            {
                if (CheckForNaughtyWords(e.Message.Content.ToLower(), Program.cfgjson.WordListList[key]))
                {
                    string reason = Program.cfgjson.WordListList[key].Reason;
                    try
                    {
                        e.Message.DeleteAsync();
                        await SendInfringingMessaageAsync(logChannel, e.Message, reason, null);
                    }
                    catch
                    {
                        // still warn anyway
                    }

                    match = true;

                    DiscordMessage msg = await e.Channel.SendMessageAsync($"{Program.cfgjson.Emoji.Denied} {e.Message.Author.Mention} was automatically warned: **{reason.Replace("`", "\\`").Replace("*", "\\*")}**");
                    var warning = await _warnings.GiveWarningAsync(e.Message.Author, _client.CurrentUser, reason, contextLink: Warnings.MessageLink(msg), e.Channel);
                    await SendInfringingMessaageAsync(badMsgLog, e.Message, reason, warning.ContextLink);
                    return;
                }
                if (match)
                    return;
            }

            if (match)
                return;

            // Mass mentions
            if (e.Message.MentionedUsers.Count >= Program.cfgjson.MassMentionThreshold && Warnings.GetPermLevel(member) < ServerPermLevel.Tier3)
            {
                string reason = "Mass mentions";
                try
                {
                    e.Message.DeleteAsync();
                    SendInfringingMessaageAsync(logChannel, e.Message, reason, null);
                }
                catch
                {
                    // still warn anyway
                }

                DiscordMessage msg = await e.Channel.SendMessageAsync($"{Program.cfgjson.Emoji.Denied} {e.Message.Author.Mention} was automatically warned: **{reason.Replace("`", "\\`").Replace("*", "\\*")}**");
                var warning = await _warnings.GiveWarningAsync(e.Message.Author, _client.CurrentUser, reason, contextLink: Warnings.MessageLink(msg), e.Channel);
                await SendInfringingMessaageAsync(badMsgLog, e.Message, reason, warning.ContextLink);
                return;
            }

            // Unapproved invites
            if (Warnings.GetPermLevel(member) < (ServerPermLevel)Program.cfgjson.InviteTierRequirement)
            {

                string checkedMessage = e.Message.Content.Replace('\\', '/');
                foreach (string exclusion in Program.cfgjson.InviteExclusion)
                {
                    checkedMessage = checkedMessage.Replace("_clientgg/" + exclusion, "").Replace("_clientcom/invite/" + exclusion, "");
                }

                if (checkedMessage.Contains("_clientgg/") || checkedMessage.Contains("_clientcom/invite/"))
                {
                    string reason = "Sent an unapproved invite";
                    e.Message.DeleteAsync();
                    try
                    {
                        SendInfringingMessaageAsync(logChannel, e.Message, reason, null);
                    }
                    catch
                    {
                        // still warn anyway
                    }

                    DiscordMessage msg = await e.Channel.SendMessageAsync($"{Program.cfgjson.Emoji.Denied} {e.Message.Author.Mention} was automatically warned: **{reason.Replace("`", "\\`").Replace("*", "\\*")}**");
                    var warning = await _warnings.GiveWarningAsync(e.Message.Author, _client.CurrentUser, reason, contextLink: Warnings.MessageLink(msg), e.Channel);
                    await SendInfringingMessaageAsync(badMsgLog, e.Message, reason, warning.ContextLink);
                    return;
                }

            }

            // Mass emoji
            if (!Program.cfgjson.UnrestrictedEmojiChannels.Contains(e.Message.ChannelId) && e.Message.Content.Length >= Program.cfgjson.MassEmojiThreshold)
            {
                char[] tempArray = e.Message.Content.Replace("🏻", "").Replace("🏼", "").Replace("🏽", "").Replace("🏾", "").Replace("🏿", "").ToCharArray();
                int pos = 0;
                foreach (char c in tempArray)
                {

                    if (c == '™' || c == '®' || c == '©')
                    {
                        tempArray[pos] = ' ';
                    }
                    if (c == '\u200d')
                    {
                        tempArray[pos] = ' ';
                        tempArray[pos + 1] = ' ';
                    }
                    ++pos;
                }
                string input = new string(tempArray);

                var matches = emoji_rx.Matches(input);
                if (matches.Count > Program.cfgjson.MassEmojiThreshold)
                {
                    string reason = "Mass emoji";
                    e.Message.DeleteAsync();
                    SendInfringingMessaageAsync(logChannel, e.Message, reason, null);

                    if (Warnings.GetPermLevel(member) == ServerPermLevel.nothing && !await _redisClient.HashExistsInRedis("emojiPardoned", e.Message.Author.Id.ToString()))
                    {
                        await _redisClient.SetHash<bool>("emojiPardoned", member.Id.ToString(), false);
                        await e.Channel.SendMessageAsync($"{Program.cfgjson.Emoji.Information} {e.Author.Mention}, if you want to play around with lots of emoji, please use <#{Program.cfgjson.UnrestrictedEmojiChannels[0]}> to avoid punishment.");
                        return;
                    }

                    string output = $"{Program.cfgjson.Emoji.Denied} {e.Message.Author.Mention} was automatically warned: **{reason.Replace("`", "\\`").Replace("*", "\\*")}**";
                    if (!await _redisClient.HashExistsInRedis("emojiPardoned", e.Author.Id.ToString()) || await _redisClient.GetHash<bool>("emojiPardoned", e.Message.Author.Id.ToString()) == false)
                    {
                        output += $"\nIf you want to play around with lots of emoji, please use <#{Program.cfgjson.UnrestrictedEmojiChannels[0]}> to avoid punishment.";
                        await _redisClient.SetHash<bool>("emojiPardoned", member.Id.ToString(), true);
                    }

                    DiscordMessage msg = await e.Channel.SendMessageAsync(output);
                    var warning = await _warnings.GiveWarningAsync(e.Message.Author, _client.CurrentUser, reason, contextLink: Warnings.MessageLink(msg), e.Channel);
                    await SendInfringingMessaageAsync(badMsgLog, e.Message, reason, warning.ContextLink);
                    return;
                }
            }
        }

        public async Task SendInfringingMessaageAsync(DiscordChannel channel, DiscordMessage infringingMessage, string reason, string messageURL)
        {
            var embed = new DiscordEmbedBuilder()
            .WithDescription(infringingMessage.Content)
            .WithColor(new DiscordColor(0xf03916))
            .WithTimestamp(infringingMessage.Timestamp)
            .WithFooter(
                $"User ID: {infringingMessage.Author.Id}",
                null
            )
            .WithAuthor(
                $"{infringingMessage.Author.Username}#{infringingMessage.Author.Discriminator} in #{infringingMessage.Channel.Name}",
                null,
                infringingMessage.Author.AvatarUrl
            )
            .AddField("Reason", reason, true);
            if (messageURL != null)
                embed.AddField("Message link", $"[`Jump to warning`]({messageURL})", true);

            await channel.SendMessageAsync($"{Program.cfgjson.Emoji.Denied} Deleted infringing message by {infringingMessage.Author.Mention} in {infringingMessage.Channel.Mention}:", embed);
        }


        public async Task GuildCreated(DiscordClient client, GuildCreateEventArgs e)
        {
            // todo: setup proper guild settings
            Guild guild = new Guild();
            guild.Id = e.Guild.Id;
            guild.OwnerId = e.Guild.Owner.Id;
            guild.Configuration = new GuildConfiguration
            {
                Moderation = new ModerationOptions
                {
                    MassEmojiThreshold = 6,
                    BanList = new List<string>(),
                    MuteList = new List<string>(),
                    UnrestrictedEmojiChannels = new List<ulong>(),
                    LockdownEnabledChannels = new List<ulong>()
                }   
            };
            await _guildService.SaveGuild(guild).ConfigureAwait(false);
        }

        public async Task GuildMemberAdded(DiscordClient client, GuildMemberAddEventArgs e)
        {
            if (e.Guild.Id != Program.cfgjson.ServerID)
                return;

            if (await _redisClient.HashExistsInRedis("mutes", e.Member.Id.ToString()))
            {
                // todo: store per-guild
                DiscordRole mutedRole = e.Guild.GetRole(Program.cfgjson.MutedRole);
                await e.Member.GrantRoleAsync(mutedRole, "Reapplying mute: possible mute evasion.");
            }
            await CheckAndDehoistMemberAsync(e.Member);
        }

        public async Task GuildMemberUpdated(DiscordClient client, GuildMemberUpdateEventArgs e)
        {
            await CheckAndDehoistMemberAsync(e.Member);
        }

        public async Task UserUpdated(DiscordClient client, UserUpdateEventArgs e)
        {
            var guild = await client.GetGuildAsync(Program.cfgjson.ServerID);
            var member = await guild.GetMemberAsync(e.UserAfter.Id);

            await CheckAndDehoistMemberAsync(member);
        }

        public async Task OnReaction(DiscordClient client, MessageReactionAddEventArgs e)
        {
            if (e.Emoji.Id != Program.cfgjson.HeartosoftId || e.Channel.IsPrivate || e.Guild.Id != Program.cfgjson.ServerID)
                return;

            bool handled = false;

            DiscordMessage targetMessage = await e.Channel.GetMessageAsync(e.Message.Id);

            DiscordEmoji noHeartosoft = await e.Guild.GetEmojiAsync(Program.cfgjson.NoHeartosoftId);

            if (targetMessage.Author.Id == e.User.Id)
            {
                await targetMessage.DeleteReactionAsync(e.Emoji, e.User);
                handled = true;
            }

            foreach (string word in Program.cfgjson.RestrictedHeartosoftPhrases)
            {
                if (targetMessage.Content.ToLower().Contains(word))
                {
                    if (!handled)
                        await targetMessage.DeleteReactionAsync(e.Emoji, e.User);

                    await targetMessage.CreateReactionAsync(noHeartosoft);
                    return;
                }
            }
        }

        static bool CheckForNaughtyWords(string input, WordListJson naughtyWordList)
        {
            string[] naughtyWords = naughtyWordList.Words;
            if (naughtyWordList.WholeWord)
            {
                input = input.Replace("\'", " ")
                    .Replace("-", " ")
                    .Replace("_", " ")
                    .Replace(".", " ")
                    .Replace(":", " ")
                    .Replace("/", " ")
                    .Replace(",", " ");

                char[] tempArray = input.ToCharArray();

                tempArray = Array.FindAll(tempArray, c => char.IsLetterOrDigit(c) || char.IsWhiteSpace(c));
                input = new string(tempArray);

                string[] arrayOfWords = input.Split(' ');

                for (int i = 0; i < arrayOfWords.Length; i++)
                {
                    bool isNaughty = false;
                    foreach (string naughty in naughtyWords)
                    {
                        string distinctString = new string(arrayOfWords[i].Replace(naughty, "#").Distinct().ToArray());
                        if (distinctString.Length <= 3 && arrayOfWords[i].Contains(naughty))
                        {
                            if (distinctString.Length == 1)
                            {
                                isNaughty = true;

                            }
                            else if (distinctString.Length == 2 && (naughty.EndsWith(distinctString[1].ToString()) || naughty.StartsWith(distinctString[0].ToString())))
                            {
                                isNaughty = true;
                            }
                            else if (distinctString.Length == 3 && naughty.EndsWith(distinctString[1].ToString()) && naughty.StartsWith(distinctString[0].ToString()))
                            {
                                isNaughty = true;
                            }
                        }
                        if (arrayOfWords[i] == "")
                        {
                            isNaughty = false;
                        }
                    }
                    if (isNaughty)
                    {
                        return true;
                    }
                }
                return false;
            }
            else
            {
                foreach (string word in naughtyWords)
                {
                    if (input.Contains(word))
                    {
                        return true;
                    }
                }
                return false;
            }

        }

        public static async Task<bool> CheckAndDehoistMemberAsync(DiscordMember targetMember)
        {
            if (
                targetMember.DisplayName[0] == ModCmds.dehoistCharacter ||
                !(Program.cfgjson.AutoDehoistCharacters.Contains(targetMember.DisplayName[0]))
                )
            {
                return false;
            }

            try
            {
                await targetMember.ModifyAsync(a =>
                {
                    a.Nickname = ModCmds.DehoistName(targetMember.DisplayName);
                });
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
