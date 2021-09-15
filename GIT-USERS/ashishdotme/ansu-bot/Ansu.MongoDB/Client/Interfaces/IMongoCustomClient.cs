using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Driver;

namespace Ansu.MongoDB.Client.Impl
{
    public interface IMongoCustomClient
    {
        Task InsertOneAsync<T>(T document) where T : class;

        Task<DeleteResult> DeleteOneAsync<T>(FilterDefinition<T> filter) where T : class;

        Task<UpdateResult> UpdateOneAsync<T>(FilterDefinition<T> filter, UpdateDefinition<T> updateDocument, UpdateOptions updateOptions) where T : class;

        Task<UpdateResult> UpdateManyAsync<T>(FilterDefinition<T> filter, UpdateDefinition<T> updateDocument, UpdateOptions updateOptions) where T : class;

        Task<ReplaceOneResult> ReplaceOneAsync<T>(FilterDefinition<T> filter, T replacement, ReplaceOptions replaceOptions) where T : class;

        Task<IEnumerable<T>> GetAllItemsAsync<T>() where T : class;

        Task<IEnumerable<T>> GetAllItemsAsync<T>(FilterDefinition<T> filter) where T : class;
    }
}
