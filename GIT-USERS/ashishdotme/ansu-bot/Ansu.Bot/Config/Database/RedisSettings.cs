using System;
using Ansu.Redis.Client.Interfaces;

namespace Ansu.Bot.Config.Models
{
    public class RedisSettings : IRedisSettings
    {
        public string Host { get; set; }
        public string Password { get; set; }
        public string Port { get; set; }
        public string Timeout { get; set; }
        public string Database { get; set; }
    }
}
