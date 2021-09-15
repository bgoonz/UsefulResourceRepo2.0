using System;
namespace Ansu.Redis.Client.Interfaces
{
    public interface IRedisSettings
    {
        string Host { get; set; }
        string Password { get; set; }
        string Port { get; set; }
        string Timeout { get; set; }
        string Database { get; set; }
    }
}
