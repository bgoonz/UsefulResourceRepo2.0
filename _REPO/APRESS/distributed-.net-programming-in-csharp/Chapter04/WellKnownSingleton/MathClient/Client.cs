using System;
using System.Runtime.Remoting;
using System.Runtime.Remoting.Channels;
using System.Runtime.Remoting.Channels.Http;
using MathLibrary;

namespace MathClient
{
	class ClientMain
	{
		static void Main(string[] args)
		{
         // Create and register the channel. The default channel ctor 
         // does not open a port, so we can't use this to receive messsages.
			HttpClientChannel channel = new HttpClientChannel();
         ChannelServices.RegisterChannel(channel);

         // Go get the remote object
         Object remoteObj = Activator.GetObject(
                               typeof(MathLibrary.SimpleMath),
                               "http://localhost:13101/myURI.soap"
                            );

         // Cast the returned proxy to the SimpleMath type
         SimpleMath math = (SimpleMath)remoteObj;

         // Use the remote object
         Console.WriteLine("5 + 2 = {0}", math.Add(5,2));
         Console.WriteLine("5 - 2 = {0}", math.Subtract(5,2));

         // Ask user to press enter
         Console.Write("Press enter to end");
         Console.ReadLine();
      }
	}
}
