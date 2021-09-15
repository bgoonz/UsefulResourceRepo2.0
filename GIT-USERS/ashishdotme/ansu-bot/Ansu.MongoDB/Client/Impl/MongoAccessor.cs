using System;
using System.Threading.Tasks;
using Ansu.MongoDB.Client.Interfaces;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Ansu.MongoDB.Client.Impl
{
    public class MongoAccessor : IMongoAccessor
    {
        private readonly IMongoSettings _mongoSettings;

        public MongoAccessor(IMongoSettings mongoSettings)
        {
            _mongoSettings = mongoSettings;
        }

        private IMongoDatabase GetDatabase()
        {
            var client = new MongoClient(_mongoSettings.ConnectionString);
            return client.GetDatabase(_mongoSettings.Database);
        }

        public bool CollectionExists()
        {
            var database = GetDatabase();
            return database.ListCollectionsAsync(
                new ListCollectionsOptions { Filter = new BsonDocument("name", _mongoSettings.Collection) }).Result.Any();
        }

        public async Task CreateCollection(int throughPut)
        {
            var database = GetDatabase();
            var createCollectionCommand = new BsonDocument
            {
                { "customAction", "CreateCollection" },
                { "collection", _mongoSettings.Collection },
                { "offerThroughput", throughPut }
            };

            await database.RunCommandAsync<BsonDocument>(createCollectionCommand);
        }

        public IMongoCollection<T> GetCollection<T>()
        {
            var database = GetDatabase();
            return database.GetCollection<T>(_mongoSettings.Collection);
        }
    }
}
