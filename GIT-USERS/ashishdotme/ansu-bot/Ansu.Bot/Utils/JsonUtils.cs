using System.Net;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Ansu.Bot.Utils
{
    public static class JsonUtils
    {
        public static async Task<T> GetResponse<T>(string url) where T : new()
        {
            using (var client = new WebClient())
            {
                var jsonString = client.DownloadString(url);
                await Task.CompletedTask;
                return !string.IsNullOrEmpty(jsonString) ? JsonConvert.DeserializeObject<T>(jsonString) : new T();
            }
        }
    }
}
