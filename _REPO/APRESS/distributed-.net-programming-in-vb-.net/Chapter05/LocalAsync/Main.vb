Imports System.Threading

Module LocalAsyncMain
   
   Delegate Function BinaryOperatorDelegate(n1 As Integer, n2 As Integer) _
      As Integer

   Sub Main()
   
      'Display the primary thread's ID
      Console.WriteLine("Main executing on thread {0}", _
         Thread.CurrentThread.GetHashCode())

      Dim math As New SimpleMath()

      'Create the delegate instance
      Dim binOp As New BinaryOperatorDelegate(AddressOf math.Add)

      'Call SimpleMath.Add(5, 2) asynchronously
      Dim asyncResult As IAsyncResult 
      asyncResult = binOp.BeginInvoke(5, 2, Nothing, Nothing)
            
      ''Do other work while SimpleMath.Add runs in the background ...
      'Do While Not asyncResult.IsCompleted
      '   Console.WriteLine("Main thread working ...")
      '   Thread.Sleep(1000)
      'Loop

      'Do other work while SimpleMath.Add runs in the background ...
      Do While Not asyncResult.AsyncWaitHandle.WaitOne(1000, true)
         Console.WriteLine("Main thread working ...")
      Loop

      'Get the result from SimpleMath.Add, thread blocks here
      Dim result As Integer = binOp.EndInvoke(asyncResult)
      Console.WriteLine("The result is {0}", result)

      Console.ReadLine()
   End Sub
End Module