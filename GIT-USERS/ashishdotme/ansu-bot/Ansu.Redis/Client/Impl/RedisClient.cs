using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Ansu.Redis.Client.Interfaces;
using Ansu.Redis.Utils;
using Newtonsoft.Json;
using StackExchange.Redis;

namespace Ansu.Redis.Client.Impl
{
    public class RedisClient : IRedisClient
    {
        private readonly IRedisSettings _redisSettings;
        private readonly int _database;
        private IConnectionMultiplexer _connectionMultiplexer;

        public RedisClient(IRedisSettings redisSettings)
        {
            _redisSettings = redisSettings;
            _connectionMultiplexer = ConnectionMultiplexer.Connect($"{_redisSettings.Host}:{_redisSettings.Port}, password={_redisSettings.Password}");
            _database = Convert.ToInt32(_redisSettings.Database);

        }

        public async Task Set<T>(string key, T value)
        {
            await this.Set(key, value, Convert.ToInt32(_redisSettings.Timeout));
        }

        public async Task SetHash<T>(string key, string hash, T value)
        {
            try
            {
                if (object.Equals(value, default(T)))
                {
                    return;
                }
                var database = _connectionMultiplexer.GetDatabase(_database);
                await database.HashSetAsync(key, hash, JsonConvert.SerializeObject(value));

            }
            catch (Exception e)
            {
                // log error
            }
        }

        public async Task PushListRight<T>(string key, T value)
        {
            try
            {
                var database = _connectionMultiplexer.GetDatabase(_database);
                await database.ListRightPushAsync(key, JsonConvert.SerializeObject(value));
            }
            catch (Exception e)
            {
                // log error
            }
        }

        public async Task Set<T>(string key, T value, int timeout)
        {
            try
            {
                if(object.Equals(value, default(T)))
                {
                    return;
                }
                var time = TimeSpan.FromSeconds(timeout);
                var database = _connectionMultiplexer.GetDatabase(_database);
                await database.StringSetAsync(key, JsonConvert.SerializeObject(value), time);

            }
            catch (Exception e)
            {
                // log error
            }
        }

        public async Task<T> Get<T>(string key)
        {
            try
            {
                var database = _connectionMultiplexer.GetDatabase(_database);
                var keyString = await database.StringGetAsync(key);
                if(keyString.IsNullOrEmpty || string.IsNullOrEmpty(keyString))
                {
                    return default(T);
                }
                return JsonConvert.DeserializeObject<T>(keyString);
            }
            catch (Exception e)
            {
                // log error
            }
            return default(T);
        }

        public async Task<List<T>> GetListAt<T>(string key, long start, long stop)
        {
            try
            {
                var database = _connectionMultiplexer.GetDatabase(_database);
                var keyListString =  await database.ListRangeAsync(key, start, stop);
                List<T> keyList = new List<T>();
                foreach (var keyValue in keyListString)
                {
                    keyList.Add(JsonConvert.DeserializeObject<T>(keyValue));
                }
                return keyList;
            }
            catch (Exception e)
            {
                // log error
            }
            return default(List<T>);
        }

        public async Task<T> GetHash<T>(string key, string hash)
        {
            try
            {
                var database = _connectionMultiplexer.GetDatabase(_database);
                var keyString = await database.HashGetAsync(key, hash);
                if (keyString.IsNullOrEmpty || string.IsNullOrEmpty(keyString))
                {
                    return default(T);
                }
                return JsonConvert.DeserializeObject<T>(keyString);
            }
            catch (Exception e)
            {
                // log error
            }
            return default(T);
        }

        public async Task<bool> Remove(string key)
        {
            try
            {
                var database = _connectionMultiplexer.GetDatabase(_database);
                return await database.KeyDeleteAsync(key);
            }
            catch (Exception e)
            {
                // log error
                return false;
            }
        }

        public async Task<bool> RemoveHash(string key, string hash)
        {
            try
            {
                var database = _connectionMultiplexer.GetDatabase(_database);
                return await database.HashDeleteAsync(key, hash);
            }
            catch (Exception e)
            {
                // log error
                return false;
            }
        }

        public async Task<bool> KeyExistsInRedis(string key)
        {
            try
            {
                var database = _connectionMultiplexer.GetDatabase(_database);
                return await database.KeyExistsAsync(key);
            }
            catch (Exception e)
            {
                // log error
                return false;   
            }
        }

        public async Task<bool> HashExistsInRedis(string key, string hash)
        {
            try
            {
                var database = _connectionMultiplexer.GetDatabase(_database);
                return await database.HashExistsAsync(key, hash);
            }
            catch (Exception e)
            {
                // log error
                return false;
            }
        }
    }
}
