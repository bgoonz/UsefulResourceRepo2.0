using System.Collections.Generic;
using System.Threading.Tasks;
using Ansu.Bot.Service.Models;
using Ansu.Service.Models;

namespace Ansu.Repository.Interfaces
{
    public interface IGuildRepository
    {
        Task SaveGuild(Guild guildModel);

        Task UpdateGuild(Guild guildModel);

        Task<List<Guild>> GetGuilds(GuildContext guildContext);

        Task DeleteGuild(ulong guildId);

        Task<Guild> GetGuild(ulong guildId);
    }
}
