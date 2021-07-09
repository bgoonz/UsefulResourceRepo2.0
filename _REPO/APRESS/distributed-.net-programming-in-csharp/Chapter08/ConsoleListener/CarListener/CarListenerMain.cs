using System;
using System.Runtime.Remoting;
using System.Runtime.Remoting.Channels;
using System.Runtime.Remoting.Channels.Tcp;
using SimpleCarLibrary;

namespace CarListener
{
	
   class CarListenerMain
   {
      static void Main(string[] args)
      {
         // Create a TCP channel specifying the port #
         IChannel channel = new TcpChannel(13101);

         // Register the channel with the runtime remoting services
         ChannelServices.RegisterChannel(channel);

         // Register CarService as a well known type
         RemotingConfiguration.RegisterWellKnownServiceType(
            typeof(SimpleCarLibrary.CarService), // The type to register
            "CarService",                        // The objectURI
            WellKnownObjectMode.SingleCall       
         );

         // Keep the server alive until enter is pressed.
         Console.WriteLine("Press Enter to end");
         Console.ReadLine();
      }
   }
}
