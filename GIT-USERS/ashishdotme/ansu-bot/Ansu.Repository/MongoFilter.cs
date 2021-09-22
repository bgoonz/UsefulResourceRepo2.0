using System;
using Ansu.Repository.Interfaces;
using Ansu.Repository.Models;
using Ansu.Repository.Utils;
using Ansu.Service.Models;
using MongoDB.Driver;

namespace Ansu.Repository
{
    public class MongoFilter : IMongoFilter
    {
        public FilterDefinition<MongoGuild> CreateFilterDefinition(GuildContext filterContext)
        {
            if (filterContext == null)
            {
                return null;

            }
            var filter = Builders<MongoGuild>.Filter.Eq(x => x.Metadata.BotVersion, Constants.BotVersion);

            if (filterContext.Id != 0)
            {
                filter &= Builders<MongoGuild>.Filter.Eq(x => x.Document.Id, filterContext.Id);
            }
            return filter;
        }
    }
}
