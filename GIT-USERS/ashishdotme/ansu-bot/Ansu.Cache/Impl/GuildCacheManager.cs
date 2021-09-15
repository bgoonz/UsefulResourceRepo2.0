
using System;
using System.Threading.Tasks;
using Ansu.Cache.Interfaces;
using Ansu.Redis.Client.Interfaces;
using Serilog;

namespace Ansu.Cache.Impl
{
    public class GuildCacheManager : IGuildCacheManager
    {
        private readonly IRedisClient _redisClient;
        private readonly ILogger _logger;

        public GuildCacheManager(IRedisClient redisClient, ILogger logger)
        {
            _redisClient = redisClient;
            _logger = logger;
        }

        public async Task ClearCache(string guildId)
        {
            await _redisClient.RemoveHash("guilds", guildId);
        }

        public async Task<T> GetGuild<T>(ulong guildId)
        {
            try
            {
                var guild = await _redisClient.GetHash<T>("guilds", guildId.ToString());
                if (guild != null)
                {
                    return guild;
                } else
                {
                    return default(T);
                }
            }
            catch(Exception ex)
            {
                _logger.Error($"Redis Exception: {ex.Message}");
                return default(T);
            }
        }

        public async Task SaveGuild<T>(T guild, ulong guildId)
        {
            try
            {
                await _redisClient.SetHash<T>("guilds", guildId.ToString(), guild);
            }
            catch (Exception ex)
            {
                _logger.Error($"Redis Exception: {ex.Message}");
            }
        }
    }
}
