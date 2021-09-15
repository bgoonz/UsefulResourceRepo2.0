using System;
namespace Ansu.Repository.Exceptions
{
    public class NotFoundException : System.ApplicationException
    {
        public NotFoundException(ulong guildId):base($"Guild not found with id {guildId}")
        {
        }
    }
}
