using System;
using System.Threading;
using System.Runtime.Remoting;
using System.Runtime.Remoting.Messaging;
using MathLibrary;

namespace MathClient
{
   class ClientMain
   {
      static void Main(string[] args)
      {
         // Load the configuration file
         RemotingConfiguration.Configure("MathClient.exe.config");

         // Get proxy to remote SimpleMath object
         ISimpleMath math = (ISimpleMath) Activator.GetObject(
            typeof(MathLibrary.SimpleMath),
            "http://localhost:13101/SimpleMath.soap");

         // Establish call context data
         CallContextData ctxData = new CallContextData("MyToken");
         CallContext.SetData("token", ctxData);
         
         // Invoke Add aand print result
         int result = math.Add(5, 2);
         Console.WriteLine("5 + 2 = {0}", result);
         
         // Ask user to press enter
         Console.Write("Press enter to end");
         Console.ReadLine();  
      }
   }
}
