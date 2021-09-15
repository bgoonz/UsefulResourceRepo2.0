using System;
using System.Collections.Generic;
using System.Text.Json;
using Ansu.Service.Models;

namespace Ansu.Bot.Service.Models
{
    public class Guild
    {
        public Guild()
        {
            Configuration = new GuildConfiguration();
            Reminders = new List<Reminder>();
        }

        public ulong Id { get; set; }

        public ulong OwnerId { get; set; }

        public GuildConfiguration Configuration { get; set; }

        public List<Reminder> Reminders { get; set; }
    }
}
