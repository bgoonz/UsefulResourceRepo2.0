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
         // Go get the remote object
         Object remoteObj = Activator.GetObject(
                               typeof(MathLibrary.SimpleMath),
                               "http://localhost:13101/myURI.soap"
                            );

         // Cast the returned proxy to the SimpleMath type
         SimpleMath math = (SimpleMath)remoteObj;

         // Use the remote object. Loop until user enters 'q'
         do
         {                 
            Console.WriteLine("5 + 2 = {0}", math.Add(5,2));
            Console.Write("Enter q to quit: ");
         }while (Console.ReadLine() != "q");

         // Ask user to press enter
         Console.Write("Press enter to end");
         Console.ReadLine();
      }
	}
}
