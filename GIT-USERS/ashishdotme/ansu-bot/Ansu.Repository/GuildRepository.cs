using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ansu.Bot.Service.Models;
using Ansu.MongoDB.Client.Impl;
using Ansu.Repository.Converters;
using Ansu.Repository.Exceptions;
using Ansu.Repository.Interfaces;
using Ansu.Service.Models;
using Serilog;

namespace Ansu.Repository
{
    public class GuildRepository : IGuildRepository
    {
        private readonly IMongoCustomClient _mongoCustomClient;
        private readonly IMongoFilter _mongoFilter;
        private readonly IGuildUpdateDefinitionCreator _guildUpdateDefinitionCreator;
        private readonly ILogger _logger;

        public GuildRepository(IMongoCustomClient mongoCustomClient, IMongoFilter mongoFilter, IGuildUpdateDefinitionCreator guildUpdateDefinitionCreator)
        {
            _mongoCustomClient = mongoCustomClient;
            _guildUpdateDefinitionCreator = guildUpdateDefinitionCreator;
            _mongoFilter = mongoFilter;
        }

        public async Task DeleteGuild(ulong guildId)
        {
            var filter = _mongoFilter.CreateFilterDefinition(new GuildContext { Id = guildId });
            var _guild = await _mongoCustomClient.GetAllItemsAsync(filter).ConfigureAwait(false);
            if (!_guild.Any())
            {
                _logger.Error("Guild not found");
                throw new NotFoundException(guildId);
            }
            await _mongoCustomClient.DeleteOneAsync(filter).ConfigureAwait(false);
        }

        public async Task<Guild> GetGuild(ulong guildId)
        {
            var filter = _mongoFilter.CreateFilterDefinition(new GuildContext { Id = guildId });
            var _guild = await _mongoCustomClient.GetAllItemsAsync(filter).ConfigureAwait(false);
            if (!_guild.Any())
            {
                _logger.Error("Guild not found");
                throw new NotFoundException(guildId);
            }
            return ModelConverter.ToGuild(_guild.First());
        }


        public async Task<List<Guild>> GetGuilds(GuildContext filterContext)
        {
            var filter = _mongoFilter.CreateFilterDefinition(filterContext);
            var items = await _mongoCustomClient.GetAllItemsAsync(filter).ConfigureAwait(false);
            var guilds = ModelConverter.ToGuilds(items.ToList());
            return guilds;
        }

        public async Task SaveGuild(Guild guild)
        {
            var filter = _mongoFilter.CreateFilterDefinition(new GuildContext { Id = guild.Id });
            var _guild = await _mongoCustomClient.GetAllItemsAsync(filter).ConfigureAwait(false);
            if (_guild.Any())
            {
                _logger.Error("Duplicate guild");
                throw new DuplicateGuildException(guild.Id);
            } else
            {
                var mongoGuild = ModelConverter.ToMongoModel(guild);
                try
                {
                    await _mongoCustomClient.InsertOneAsync(mongoGuild).ConfigureAwait(false);

                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                }
            }
        }

        public async Task UpdateGuild(Guild guild)
        {
            var filter = _mongoFilter.CreateFilterDefinition(new GuildContext { Id = guild.Id });
            var update = _guildUpdateDefinitionCreator.CreateUpdateDefinition(guild);
            var result = await _mongoCustomClient.UpdateOneAsync(filter, update, null);
            if (result.IsAcknowledged == false || result.MatchedCount == 0)
            {
                _logger.Error($"Guild {guild.Id} not found");
                throw new DuplicateGuildException(guild.Id);
            }
        }
    }
}
