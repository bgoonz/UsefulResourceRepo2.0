Imports System.Runtime.Remoting 'General remoting stuff
Imports System.Threading
Imports MathLibrary
Imports ClientLibrary

Module MathClient

   Sub Main()
   
      'Display the primary thread's ID
      Console.WriteLine("Main executing on thread {0}", _
         Thread.CurrentThread.GetHashCode())

      'Load the configuration file
      RemotingConfiguration.Configure("MathClient.exe.config")

      'Create the remote object
      Dim math As New SimpleMath()

      'Create the object used for the client callback
      Dim mathResult As New SimpleMathResult()

      'Call async version of Add. Pass the callback delegate.
      math.AsyncAdd(5, 2, _
         New SimpleMath.ClientCallbackDelegate( _
            AddressOf mathResult.MathCallback) _
      )

      'Ask user to press Enter
      Console.WriteLine("Press enter to end")
      Console.ReadLine() 
   End Sub
End Module
