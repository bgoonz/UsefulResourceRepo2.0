using System;
using Ansu.MongoDB.Client.Interfaces;

namespace Ansu.Bot.Config.Models
{
    public class MongoSettings : IMongoSettings
    {
        public string Database { get; set; }
        public string Collection { get; set; }
        public string ConnectionString { get; set; }
    }
}
