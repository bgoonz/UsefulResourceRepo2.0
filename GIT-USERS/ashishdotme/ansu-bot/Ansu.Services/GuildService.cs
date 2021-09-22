using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Ansu.Bot.Service.Models;
using Ansu.Cache.Interfaces;
using Ansu.Repository.Interfaces;
using Ansu.Service.Interfaces;
using Ansu.Service.Models;
using Serilog;

namespace Ansu.Bot.Service
{
    public class GuildService : IGuildService
    {
        private readonly IGuildCacheManager _guildCacheManager;
        private readonly IGuildRepository _guildRepository;
        private readonly ILogger _logger;

        public GuildService(IGuildRepository guildRepository, ILogger logger, IGuildCacheManager guildCacheManager)
        {
            _guildRepository = guildRepository;
            _guildCacheManager = guildCacheManager;
            _logger = logger;
        }

        public async Task DeleteGuild(ulong guildId)
        {
            await _guildRepository.DeleteGuild(guildId).ConfigureAwait(false);
        }

        public async Task<Guild> GetGuild(ulong guildId)
        {
            var cachedGuild = await _guildCacheManager.GetGuild<Guild>(guildId);
            if(cachedGuild != null || cachedGuild != default(Guild))
            {
                return cachedGuild;
            }
            var guild = await _guildRepository.GetGuild(guildId).ConfigureAwait(false);
            await _guildCacheManager.SaveGuild<Guild>(guild, guild.Id);
            return guild;
        }

        public async Task<List<Guild>> GetAllGuilds()
        {
            var guilds = await _guildRepository.GetGuilds(new GuildContext()).ConfigureAwait(false);
            return guilds;
        }

        public async Task SaveGuild(Guild guild)
        {
            try
            {
                await _guildRepository.SaveGuild(guild).ConfigureAwait(false);
                _logger.Information($"Saved guild settings for {guild.Id}");
            }
            catch (Exception ex)
            {
                _logger.Error($"Failed to save guild settings for {guild.Id}");
                _logger.Error($"Guild service exception : {ex.Message}");
            } finally
            {
                await _guildCacheManager.ClearCache(guild.Id.ToString());
            }
        }


        public async Task UpdateGuild(Guild guild)
        {
            try
            {
                await _guildRepository.UpdateGuild(guild).ConfigureAwait(false);
                _logger.Information($"Updated guild settings for {guild.Id}");
            }
            catch (Exception ex)
            {
                _logger.Error($"Failed to update guild settings for {guild.Id}");
                _logger.Error($"Guild service exception : {ex.Message}");
            }
            finally
            {
                await _guildCacheManager.ClearCache(guild.Id.ToString());
            }
        }
    }
}
