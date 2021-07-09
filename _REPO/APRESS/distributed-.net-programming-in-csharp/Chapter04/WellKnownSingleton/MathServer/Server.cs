using System;
using System.Runtime.Remoting;
using System.Runtime.Remoting.Channels;
using System.Runtime.Remoting.Channels.Http;

namespace MathServer
{	
   class ServerMain
   {
      static void Main(string[] args)
      {
         // Create a channel specifying the port #
         HttpChannel channel = new HttpChannel(13101);

         // Register the channel with the runtime remoting services
         ChannelServices.RegisterChannel(channel);

         // Register a type as a well known type
         RemotingConfiguration.RegisterWellKnownServiceType(
            typeof(MathLibrary.SimpleMath), // The type to register
            "MyURI.soap",                   // The well known name
            WellKnownObjectMode.Singleton   // SingleCall or Singleton
            );

         // Keep the server alive until enter is pressed.
         Console.WriteLine("Server started. Press Enter to end");
         Console.ReadLine();
      }
   }
}
