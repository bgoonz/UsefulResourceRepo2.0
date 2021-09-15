using System;
using Ansu.MongoDB.Client.Impl;
using Microsoft.Extensions.DependencyInjection;

namespace Ansu.MongoDB.Client
{
    public static class IServiceCollectionExtension
    {
        public static IServiceCollection AddMongoCustomClient(this IServiceCollection services)
        {
            services.AddTransient<IMongoAccessor, MongoAccessor>();
            services.AddTransient<IMongoCustomClient, MongoCustomClient>();

            return services;
        }
    }
}
