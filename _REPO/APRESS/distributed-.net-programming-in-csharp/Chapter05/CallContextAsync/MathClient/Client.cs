using System;
using System.Threading;
using System.Runtime.Remoting;
using System.Runtime.Remoting.Messaging;
using MathLibrary;

namespace MathClient
{
class ClientMain
{
   private delegate int BinaryOperatorDelegate(int n1, int n2);

   static void Main(string[] args)
   {
      // Display the current thread ID
      Console.WriteLine("Client executing on thread {0}", 
         Thread.CurrentThread.GetHashCode());

      // Load the configuration file
      RemotingConfiguration.Configure("MathClient.exe.config");

      ISimpleMath math = (ISimpleMath) Activator.GetObject(
         typeof(MathLibrary.SimpleMath),
         "http://localhost:13101/SimpleMath.soap");

      CallContextData ctxData = new CallContextData("MyToken");
      CallContext.SetData("token", ctxData);

      BinaryOperatorDelegate binOp = new BinaryOperatorDelegate(math.Add);
      binOp.BeginInvoke(5, 2, new AsyncCallback(AddCallback), null);
      
      // Ask user to press enter
      Console.WriteLine("Press enter to end");
      Console.ReadLine();  
   }

   static void AddCallback(IAsyncResult ar)
   {
      // Display the current thread ID
      Console.WriteLine("AddCallback executing on thread {0}", 
         Thread.CurrentThread.GetHashCode());

      Console.WriteLine("SimpleMath.Add completed!");

      // Cast IAsyncResult to the AsyncResult class
      AsyncResult asyncResult = (AsyncResult)ar;

      // Use AsyncResult.AsyncDelegate property to retrieve delegate
      BinaryOperatorDelegate binOp;
      binOp = (BinaryOperatorDelegate)asyncResult.AsyncDelegate;

      // Call EndInvoke on delegate to get results
      int result = binOp.EndInvoke(ar);
      
      // Get the security token from the call context
      CallContextData ctxData;
      ctxData = (CallContextData)CallContext.GetData("token");
      string token = (string)ctxData.Data;

      // Get the server's return message from the call context
      ctxData = (CallContextData)CallContext.GetData("message");
      string msg = (string)ctxData.Data;
      
      Console.WriteLine("The token is {0}", token);
      Console.WriteLine("The server says {0}", msg);

      Console.WriteLine("Add result is {0}", result);
   }
}
}
