using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace Ansu
{
    public class UserWarning
    {
        [JsonProperty("targetUserId")]
        public ulong TargetUserId { get; set; }

        [JsonProperty("modUserId")]
        public ulong ModUserId { get; set; }

        [JsonProperty("warningId")]
        public ulong WarningId { get; set; }

        [JsonProperty("warnReason")]
        public string WarnReason { get; set; }

        [JsonProperty("warnTimestamp")]
        public DateTime WarnTimestamp { get; set; }

        [JsonProperty("contextLink")]
        public string ContextLink { get; set; }

    }

    public class MemberPunishment
    {
        [JsonProperty("memberId")]
        public ulong MemberId { get; set; }

        [JsonProperty("expireTime")]
        public DateTime? ExpireTime { get; set; }

        [JsonProperty("modId")]
        public ulong ModId { get; set; }

        [JsonProperty("serverId")]
        public ulong ServerId { get; set; }
    }

    public struct ConfigJson
    {
        [JsonProperty("name")]
        public string Name { get;  set; }

        [JsonProperty("core")]
        public CoreConfig Core { get;  set; }

        [JsonProperty("redis")]
        public RedisConfig Redis { get;  set; }

        [JsonProperty("mongoDB")]
        public MongoConfig MongoDB { get;  set; }

        [JsonProperty("trialModRole")]
        public ulong TrialModRole { get;  set; }

        [JsonProperty("modRole")]
        public ulong ModRole { get;  set; }

        [JsonProperty("adminRole")]
        public ulong AdminRole { get;  set; }

        [JsonProperty("logChannel")]
        public ulong LogChannel { get; set; }

        [JsonProperty("serverID")]
        public ulong ServerID { get; set; }

        [JsonProperty("homeChannel")]
        public ulong HomeChannel { get; set; }

        [JsonProperty("emoji")]
        public EmojiJson Emoji { get; set; }

        [JsonProperty("mutedRole")]
        public ulong MutedRole { get; set; }

        [JsonProperty("warningDaysThreshold")]
        public int WarningDaysThreshold { get; set; }

        [JsonProperty("autoMuteThresholds")]
        public Dictionary<string, int> AutoMuteThresholds { get; set; }

        [JsonProperty("userRoles")]
        public UserRoleConfig UserRoles { get;  set; }

        [JsonProperty("restrictedWords")]
        public List<string> RestrictedWords { get;  set; }

        [JsonProperty("massMentionThreshold")]
        public int MassMentionThreshold { get;  set; }

        [JsonProperty("massEmojiThreshold")]
        public int MassEmojiThreshold { get;  set; }

        [JsonProperty("tierRoles")]
        public List<ulong> TierRoles { get;  set; }

        [JsonProperty("inviteExclusion")]
        public List<string> InviteExclusion { get;  set; }

        [JsonProperty("inviteTierRequirement")]
        public int InviteTierRequirement { get;  set; }

        [JsonProperty("unrestrictedEmojiChannels")]
        public List<ulong> UnrestrictedEmojiChannels { get;  set; }

        [JsonProperty("wordLists")]
        public Dictionary<string, WordListJson> WordListList { get;  set; }

        [JsonProperty("lockdownEnabledChannels")]
        public List<ulong> LockdownEnabledChannels { get;  set; }

        [JsonProperty("heartosoftId")]
        public ulong HeartosoftId { get;  set; }

        [JsonProperty("noHeartosoftId")]
        public ulong NoHeartosoftId { get;  set; }

        [JsonProperty("restrictedHeartosoftPhrases")]
        public List<string> RestrictedHeartosoftPhrases { get;  set; }

        [JsonProperty("autoDehoistCharacters")]
        public List<char> AutoDehoistCharacters { get;  set; }

        [JsonProperty("investigationsChannel")]
        public ulong InvestigationsChannelId { get;  set; }

    }

    public class WordListJson
    {
        [JsonProperty("wholeWord")]
        public bool WholeWord { get;  set; }

        [JsonProperty("reason")]
        public string Reason { get;  set; }

        public string[] Words { get; set; }
    }

    public class EmojiJson
    {
        [JsonProperty("noPermissions")]
        public string NoPermissions { get; set; }

        [JsonProperty("warning")]
        public string Warning { get; set; }

        [JsonProperty("error")]
        public string Error { get; set; }

        [JsonProperty("deleted")]
        public string Deleted { get; set; }

        [JsonProperty("information")]
        public string Information { get; set; }

        [JsonProperty("muted")]
        public string Muted { get; set; }

        [JsonProperty("denied")]
        public string Denied { get; set; }

        [JsonProperty("banned")]
        public string Banned { get; set; }

        [JsonProperty("unbanned")]
        public string Unbanned { get; set; }

        [JsonProperty("ejected")]
        public string Ejected { get; set; }

        [JsonProperty("loading")]
        public string Loading { get; set; }

        [JsonProperty("success")]
        public string Success { get; set; }

        [JsonProperty("locked")]
        public string Locked { get; set; }

        [JsonProperty("connected")]
        public string Connected { get; set; }

    }

    public class CoreConfig
    {
        [JsonProperty("token")]
        public string Token { get;  set; }

        [JsonProperty("prefixes")]
        public List<string> Prefixes { get;  set; }
    }

    public class RedisConfig
    {
        [JsonProperty("host")]
        public string Host { get;  set; }

        [JsonProperty("password")]
        public string Password { get;  set; }

        [JsonProperty("port")]
        public string Port { get;  set; }
    }

    public class MongoConfig
    {
        [JsonProperty("connectionString")]
        public string ConnectionString { get;  set; }

        [JsonProperty("database")]
        public string Database { get;  set; }

        [JsonProperty("collection")]
        public string Collection { get;  set; }
    }

    public class UserRoleConfig
    {
        [JsonProperty("insiderDev")]
        public ulong InsiderDev { get;  set; }

        [JsonProperty("insiderBeta")]
        public ulong InsiderBeta { get;  set; }

        [JsonProperty("insiderRP")]
        public ulong InsiderRP { get;  set; }

        [JsonProperty("patchTuesday")]
        public ulong PatchTuesday { get;  set; }
    }

}
