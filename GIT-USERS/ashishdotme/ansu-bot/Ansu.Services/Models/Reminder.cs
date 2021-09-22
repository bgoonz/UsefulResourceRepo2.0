using System;
namespace Ansu.Service.Models
{
    public class Reminder
    {
        public string Id { get; set; }

        public ulong UserID { get; set; }

        public ulong ServerID { get; set; }

        public ulong ChannelID { get; set; }

        public string MessageLink { get; set; }

        public string ReminderText { get; set; }

        public DateTime ReminderTime { get; set; }

        public DateTime OriginalTime { get; set; }
    }
}
