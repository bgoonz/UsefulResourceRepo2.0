using System;
using System.Collections.Generic;

namespace Ansu.Service.Models
{
    public class ModerationOptions
    {
        public ModerationOptions()
        {
            BanList = new List<string>();
            MuteList = new List<string>();
            UnrestrictedEmojiChannels = new List<ulong>();
            LockdownEnabledChannels = new List<ulong>();
        }

        public ulong MassEmojiThreshold { get; set; }

        public List<string> BanList { get; set; }

        public List<string> MuteList { get; set; }

        public List<ulong> UnrestrictedEmojiChannels { get; set; }

        public List<ulong> LockdownEnabledChannels { get; set; }

        public ulong TrialModRole { get; set; }

        public ulong ModRole { get; set; }

        public ulong AdminRole { get; set; }

        public ulong MutedRole { get; set; }

        public ulong VerifiedRole { get; set; }

        public ulong LogChannel { get; set; }

        public ulong HomeChannel { get; set; }

        public ulong RolesChannel { get; set; }

        public ulong InvestigationsChannel { get; set; }
    }
}
