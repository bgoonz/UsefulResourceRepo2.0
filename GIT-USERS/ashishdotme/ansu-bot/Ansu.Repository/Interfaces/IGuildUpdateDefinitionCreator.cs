using System;
using Ansu.Bot.Service.Models;
using Ansu.Repository.Models;
using MongoDB.Driver;

namespace Ansu.Repository.Interfaces
{
    public interface IGuildUpdateDefinitionCreator
    {
        UpdateDefinition<MongoGuild> CreateUpdateDefinition(Guild guild);
    }
}
