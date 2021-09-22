using System;
namespace Ansu.Bot.Exceptions
{
    public class AnsuBotException : System.ApplicationException
    {
        public AnsuBotException(string err) : base($"Ansu Bot Exception : {err}")
        {
        }
    }
}
