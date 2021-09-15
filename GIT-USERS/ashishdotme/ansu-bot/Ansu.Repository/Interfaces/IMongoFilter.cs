using System;
using Ansu.Bot.Service.Models;
using Ansu.Repository.Models;
using Ansu.Service.Models;
using MongoDB.Driver;

namespace Ansu.Repository.Interfaces
{
    public interface IMongoFilter
    {
        FilterDefinition<MongoGuild> CreateFilterDefinition(GuildContext filterContext);
    }
}
