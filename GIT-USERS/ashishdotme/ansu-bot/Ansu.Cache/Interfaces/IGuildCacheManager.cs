using System;
using System.Threading.Tasks;

namespace Ansu.Cache.Interfaces
{
    public interface IGuildCacheManager
    {
        Task<T> GetGuild<T>(ulong guildId);

        Task SaveGuild<T>(T guild, ulong guildId);

        Task ClearCache(string guildId);
    }
}
