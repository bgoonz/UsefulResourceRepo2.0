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
                               "http://localhost/MathService/SimpleMath.soap"
                            );

         // Cast the returned proxy to the SimpleMath type
         SimpleMath math = (SimpleMath)remoteObj;

         // Use the remote object
         do
         {
            Console.WriteLine("5 + 2 = {0}", math.Add(5,2));
            Console.WriteLine("5 - 2 = {0}", math.Subtract(5,2));
         }while(Console.ReadLine() != "q");

         // Ask user to press enter
         Console.Write("Press enter to end");
         Console.ReadLine();
      }
	}
}
