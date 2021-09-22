using System;
using Ansu.Bot.Service.Models;
using Ansu.Service.Models;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Ansu.Repository.Models
{
    public class MongoGuild
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public Guild Document { get; set; }

        public GuildMetadata Metadata { get; set; }
    }
}
