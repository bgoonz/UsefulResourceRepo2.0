using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Ansu.Redis.Client.Interfaces
{
    public interface IRedisClient
    {
        Task Set<T>(string key, T Value);

        Task SetHash<T>(string key, string hash, T value);

        Task PushListRight<T>(string key, T Value);

        Task Set<T>(string key, T Value, int timeout);

        Task<T> Get<T>(string key);

        Task<List<T>> GetListAt<T>(string key, long start, long stop);

        Task<T> GetHash<T>(string key, string hash);

        Task<bool> Remove(string key);

        Task<bool> RemoveHash(string key, string hash);

        Task<bool> HashExistsInRedis(string key, string hash);

        Task<bool> KeyExistsInRedis(string key);
    }
}
