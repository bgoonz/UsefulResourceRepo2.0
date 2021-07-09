Imports System.Runtime.Remoting 'General remoting stuff
Imports System.Threading
Imports MathLibrary

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
      Dim mathResult As New ClientCallbackSink()

      'Call async version of Add. Pass the callback interface.
      math.AsyncAdd(5, 2, mathResult)

      'Ask user to press Enter
      Console.WriteLine("Press enter to end")
      Console.ReadLine() 
   End Sub
End Module

Public Class ClientCallbackSink 
   Inherits MarshalByRefObject
   Implements IMathCallback

   Public Sub OnOperationComplete(result as Integer) _
      Implements IMathCallback.OnOperationComplete
      
      'Display the current thread ID
      Console.WriteLine("ResultCallback executing on thread {0}", _
         Thread.CurrentThread.GetHashCode())

      Console.WriteLine("Add result is {0}", result)

      'Simulate a long running callback
      Thread.Sleep(5000)
   End Sub
End Class
