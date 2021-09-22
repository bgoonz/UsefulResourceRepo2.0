using System;
using System.Collections.Generic;
using Ansu.Repository.Models;

namespace Ansu.Repository.Converters
{
    public static class MongoMigrator
    {
        public static void ResetData(List<MongoGuild> mongoGuild)
        {
            foreach(var mongoModel in mongoGuild)
            {
                mongoModel.Document.Configuration.Moderation.MassEmojiThreshold = 6;
            }
        }
    }
}
