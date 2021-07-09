Imports System.Runtime.Remoting 'General remoting stuff
Imports MathLibrary
Imports System.Threading

Module MathClient

   Delegate Function BinaryOperatorDelegate(n1 As Integer, n2 As Integer) _
      As Integer

   Sub Main()
      'Load the configuration file
      RemotingConfiguration.Configure("MathClient.exe.config")

      'Display the primary thread's ID
      Console.WriteLine("Main executing on thread {0}", _
         Thread.CurrentThread.GetHashCode())

      'Get a proxy to the remote object
      Dim math As New SimpleMath()

      'Create the delegate instance
      Dim binOp As New BinaryOperatorDelegate(AddressOf math.Add)

      'Call SimpleMath.Add(5, 2) asynchronously
      Dim asyncResult As IAsyncResult 
      asyncResult = binOp.BeginInvoke(5, 2, Nothing, Nothing)
            
      'Do other work while SimpleMath.Add runs in the background ...
      Do While Not asyncResult.IsCompleted
         Console.WriteLine("Main thread working ...")
         Thread.Sleep(1000)
      Loop

      'Get the result from SimpleMath.Add, thread blocks here
      Dim result As Integer = binOp.EndInvoke(asyncResult)
      Console.WriteLine("The result is {0}", result)

      'Ask user to press enter
      Console.Write("Press enter to end")
      Console.ReadLine()
   End Sub
End Module
