using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace Ansu.Service.Models
{
    public class Definitions
    {
        [JsonProperty("definition")]
        public string Definition { get; set; }

        [JsonProperty("example")]
        public string Example { get; set; }
    }

    public class Meaning
    {
        [JsonProperty("definitions")]
        public List<Definitions> Definitions { get; set; }
    }

    public class Word
    {
        [JsonProperty("meanings")]
        public List<Meaning> Meanings { get; set; }
    }
}
