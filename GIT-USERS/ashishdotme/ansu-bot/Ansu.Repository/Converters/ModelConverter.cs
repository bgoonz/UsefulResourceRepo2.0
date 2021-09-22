using System;
using System.Collections.Generic;
using Ansu.Bot.Service.Models;
using Ansu.Repository.Models;
using Ansu.Repository.Utils;
using Ansu.Service.Models;

namespace Ansu.Repository.Converters
{
    public static class ModelConverter
    {
        public static MongoGuild ToMongoModel(Guild guild)
        {
            if(guild == null)
            {
                return null;
            }

            var mongoGuild = new MongoGuild
            {
                Document = guild,
                Metadata = new GuildMetadata
                {
                    BotVersion = Constants.BotVersion
                }
            };

            return mongoGuild;
        }

        public static Guild ToGuild(MongoGuild mongoGuild)
        {
            return mongoGuild.Document;
        }

        public static List<Guild> ToGuilds(List<MongoGuild> mongoGuilds)
        {
            if(mongoGuilds == null)
            {
                return null;
            }
            MongoMigrator.ResetData(mongoGuilds);
            var guilds = new List<Guild>();
            foreach(var mongoGuild in mongoGuilds)
            {
                guilds.Add(mongoGuild.Document);
            }
            return guilds;
        }
    }
}
