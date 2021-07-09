using System;
using System.Runtime.Remoting; // General remoting stuff
using System.Runtime.Remoting.Channels; // Channel Services
using System.Runtime.Remoting.Channels.Http; // HTTP Channel

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

//         // Register a type as a well known singlecall type
//         RemotingConfiguration.RegisterWellKnownServiceType(
//            typeof(MathLibrary.SimpleMath), // The type to register
//            "MyURI.soap",                   // The well known name
//            WellKnownObjectMode.SingleCall  // SingleCall or Singleton
//         );

         // Register a type as a well known singleton type
         RemotingConfiguration.RegisterWellKnownServiceType(
            typeof(MathLibrary.SimpleMath), // The type to register
            "MyURI.soap",                   // The well known name
            WellKnownObjectMode.Singleton  // SingleCall or Singleton
         );

         // Keep the server alive until enter is pressed.
         Console.WriteLine("Server started. Press Enter to end ...");
         Console.ReadLine();
      }
	}
}
