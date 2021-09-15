using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Ansu.Bot.Service.Models;

namespace Ansu.Service.Interfaces
{
    public interface IGuildService
    {
        Task SaveGuild(Guild guild);

        Task UpdateGuild(Guild guild);

        Task<List<Guild>> GetAllGuilds();

        Task DeleteGuild(ulong guildId);

        Task<Guild> GetGuild(ulong guildId);
    }
}
