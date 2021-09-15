using System;
namespace Ansu.MongoDB.Client.Interfaces
{
    public interface IMongoSettings
    {
        string Database { get; set; }
        string Collection { get; set; }
        string ConnectionString { get; set; }
    }
}
