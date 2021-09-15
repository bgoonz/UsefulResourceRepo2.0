using System;
namespace Ansu.Repository.Exceptions
{
    public class DuplicateGuildException: System.ApplicationException
    {
        public DuplicateGuildException(ulong id):base($"Guild \"{id}\" already exists")
        {
        }
    }
}
