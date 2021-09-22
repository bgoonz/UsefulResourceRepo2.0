using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Driver;

namespace Ansu.MongoDB.Client.Impl
{
    public class MongoCustomClient : IMongoCustomClient
    {
        private readonly IMongoAccessor _mongoAccessor;
        private const int MinThroughPutValue = 400;

        public MongoCustomClient(IMongoAccessor mongoAccessor)
        {
            _mongoAccessor = mongoAccessor;
        }

        public async Task InsertOneAsync<T>(T document) where T : class
        {
            if (!_mongoAccessor.CollectionExists())
            {
                await _mongoAccessor.CreateCollection(MinThroughPutValue);
            }

            var collection = _mongoAccessor.GetCollection<T>();
            await collection.InsertOneAsync(document).ConfigureAwait(false);
        }

        public async Task<DeleteResult> DeleteOneAsync<T>(FilterDefinition<T> filter) where T : class
        {
            var collection = _mongoAccessor.GetCollection<T>();
            return await collection.DeleteOneAsync(filter).ConfigureAwait(false);
        }

        public async Task<UpdateResult> UpdateOneAsync<T>(FilterDefinition<T> filter, UpdateDefinition<T> updateDocument, UpdateOptions updateOptions) where T : class
        {
            var collection = _mongoAccessor.GetCollection<T>();
            return await collection.UpdateOneAsync(filter, updateDocument, updateOptions).ConfigureAwait(false);
        }

        public async Task<UpdateResult> UpdateManyAsync<T>(FilterDefinition<T> filter, UpdateDefinition<T> updateDocument, UpdateOptions updateOptions) where T : class
        {
            var collection = _mongoAccessor.GetCollection<T>();
            return await collection.UpdateManyAsync(filter, updateDocument, updateOptions).ConfigureAwait(false);
        }

        public async Task<ReplaceOneResult> ReplaceOneAsync<T>(FilterDefinition<T> filter, T replacement, ReplaceOptions replaceOptions) where T : class
        {
            var collection = _mongoAccessor.GetCollection<T>();
            return await collection.ReplaceOneAsync(filter, replacement, replaceOptions).ConfigureAwait(false);
        }

        public async Task<IEnumerable<T>> GetAllItemsAsync<T>() where T : class
        {
            return await GetItems(Builders<T>.Filter.Empty).ConfigureAwait(false);
        }

        public async Task<IEnumerable<T>> GetAllItemsAsync<T>(FilterDefinition<T> filter) where T : class
        {
            return await GetItems(filter).ConfigureAwait(false);
        }

        public async Task<IEnumerable<T>> GetItems<T>(FilterDefinition<T> filter)
        {
            var collection = _mongoAccessor.GetCollection<T>();
            var task = collection.FindAsync(filter).Result;
            return await task.ToListAsync().ConfigureAwait(false);
        }
    }
}
