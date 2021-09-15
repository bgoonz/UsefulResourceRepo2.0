using System;
using System.Threading.Tasks;
using MongoDB.Driver;

namespace Ansu.MongoDB.Client.Impl
{
    public interface IMongoAccessor
    {
        IMongoCollection<T> GetCollection<T>();

        bool CollectionExists();

        Task CreateCollection(int throughPut);
    }
}
