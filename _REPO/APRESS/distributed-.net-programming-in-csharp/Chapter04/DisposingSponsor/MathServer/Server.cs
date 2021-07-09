using System;
using System.Runtime.Remoting; // General remoting stuff

namespace MathServer
{
	class ServerMain
	{
      static void Main(string[] args)
      {
         RemotingConfiguration.Configure("MathServer.exe.config");

         // Keep the server alive until enter is pressed.
         Console.WriteLine("Server started. Press Enter to end ...");
         Console.ReadLine();   
      }
	}
}
