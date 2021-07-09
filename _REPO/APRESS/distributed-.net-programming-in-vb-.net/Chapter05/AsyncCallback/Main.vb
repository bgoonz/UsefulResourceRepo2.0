Imports System.Threading
Imports System.Runtime.Remoting.Messaging 'For AsyncResult class

Module AsyncCallbackMain
   
   Delegate Function BinaryOperatorDelegate(n1 As Integer, n2 As Integer) _
      As Integer

   Sub Main()
   
      'Display the primary thread's ID
      Console.WriteLine("Main executing on thread {0}", _
         Thread.CurrentThread.GetHashCode())

      Dim math As New SimpleMath()

      'Create the delegate instance
      Dim binOp As New BinaryOperatorDelegate(AddressOf math.Add)
      
      'Call SimpleMath.Add(5, 2) asynchronously and specify callback
      Dim asyncResult As IAsyncResult 
      asyncResult = binOp.BeginInvoke(5, 2, _
                        New AsyncCallback(AddressOf AddCallback), _
                        "Async call complete" _
                    )
      
      'This will block the main thread. Pressing "Enter" before the
      'async call completes will end the entire application.
      Console.ReadLine()
   End Sub

   Sub AddCallback(ar As IAsyncResult)
      
      'Display the current thread ID
      Console.WriteLine("AddCallback executing on thread {0}", _
         Thread.CurrentThread.GetHashCode())

      'Retrieve the informational object and cast it to string
      Dim msg As String = CType(ar.AsyncState, String)
      Console.WriteLine(msg)
      
      'Cast IAsyncResult to the AsyncResult class
      Dim asyncResult As AsyncResult = CType(ar, AsyncResult)

      'Use AsyncResult.AsyncDelegate property to retrieve delegate
      Dim binOp As BinaryOperatorDelegate
      binOp = CType(asyncResult.AsyncDelegate, BinaryOperatorDelegate)

      'Call EndInvoke on delegate to get results
      Dim result As Integer = binOp.EndInvoke(ar)

      Console.WriteLine("Add result is {0}", result)

   End Sub  
End Module

