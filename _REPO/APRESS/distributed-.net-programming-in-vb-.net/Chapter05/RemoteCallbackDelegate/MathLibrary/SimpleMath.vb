Imports System.Threading
Imports System.Runtime.Remoting.Messaging

Public Class SimpleMath
   Inherits MarshalByRefObject
   
   'This delegate is used by the client to establish a callback
   'which the server calls when the async operation is finished.
   Public Delegate Sub ClientCallbackDelegate(result As Integer)
   
   'This delegate is used on the server to call the Add and
   'Subtract methods asynchronously.
   Private Delegate Function BinaryOperatorDelegate(n1 As Integer,  _
      n2 As Integer) As Integer

   Public Sub AsyncAdd(n1 As Integer, n2 As Integer, _ 
                       callback As ClientCallbackDelegate)
   
      'Display the current thread ID
      Console.WriteLine("SimpleMath.AsyncAdd() executing on thread {0}", _
         Thread.CurrentThread.GetHashCode())

      'Create the delegate to execute Add asynchronously
      Dim binOp As New BinaryOperatorDelegate(AddressOf Add)

      'Call Add(n1, n2) async. Also pass server callback,
      'and client callback
      binOp.BeginInvoke(n1, n2, _
         new AsyncCallback(AddressOf DoClientCallback), callback)
         
   End Sub

   Private Sub DoClientCallback(ar As IAsyncResult)
      'Display the current thread ID
      Console.WriteLine("DoClientCallback executing on thread {0}", _
         Thread.CurrentThread.GetHashCode())

      'Cast IAsyncResult to the AsyncResult class
      Dim asyncResult As AsyncResult  = CType(ar, AsyncResult)

      'Use AsyncResult.AsyncDelegate property to retrieve delegate
      Dim binOp As BinaryOperatorDelegate
      binOp = CType(asyncResult.AsyncDelegate, BinaryOperatorDelegate)

      'Call EndInvoke on delegate to get results
      Dim result as Integer = binOp.EndInvoke(ar)

      'Retrieve the client callback from the AsyncState property
      Dim callback As ClientCallbackDelegate
      callback = CType(ar.AsyncState, ClientCallbackDelegate)
      
      'Invoke the client's callback
      callback(result)
   End Sub

   Public Function Add(n1 As Integer, n2 As Integer) As Integer
      
      'Display the current thread id
      Console.WriteLine("SimpleMath.Add() executing on thread {0}", _
         Thread.CurrentThread.GetHashCode())

      'Waste some time
      Thread.Sleep(5000)

      Return n1 + n2
   End Function

   Public Function Subtract(n1 As Integer, n2 As Integer) As Integer
      
      'Display the current thread id
      Console.WriteLine("SimpleMath.Subtract() executing on thread {0}", _
         Thread.CurrentThread.GetHashCode())

      'Waste some time
      Thread.Sleep(5000)
      
      Return n1 - n2
   End Function 
       
   Public Sub New()
      Console.WriteLine("SimpleMath ctor called")
   End Sub
End Class