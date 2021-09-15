Imports System.Threading
Imports System.Runtime.Remoting.Messaging 'CallContext Class
Imports MathLibrary

Module MathClient

   Delegate Function BinaryOperatorDelegate(n1 As Integer, n2 As Integer) _
      As Integer

   Sub Main()
            
      'Get a proxy to the remote object
      Dim obj As Object = Activator.GetObject( _
                             GetType(MathLibrary.SimpleMath), _
                             "http://localhost:13101/SimpleMath.soap" _
                          )
                          
      'Cast returned object to the ISimpleMath interface
      Dim math as ISimpleMath = CType(obj, ISimpleMath)

      'Store security token info in the call context
      Dim ctxData As New CallContextData("MyToken")
      CallContext.SetData("token", ctxData)
      
      'Create the delegate instance
      Dim binOp As New BinaryOperatorDelegate(AddressOf math.Add)
      
      'Call SimpleMath.Add(5, 2) asynchronously and specify callback
      Dim asyncResult As IAsyncResult 
      asyncResult = binOp.BeginInvoke(5, 2, _
                       New AsyncCallback(AddressOf AddCallback), Nothing)
	     
      'Ask user to press Enter
      Console.WriteLine("Press enter to end")
      Console.ReadLine()
   End Sub
   
   Sub AddCallback(ar As IAsyncResult)
      
      'Display the current thread ID
      Console.WriteLine("AddCallback executing on thread {0}", _
         Thread.CurrentThread.GetHashCode())

      'Cast IAsyncResult to the AsyncResult class
      Dim asyncResult As AsyncResult = CType(ar, AsyncResult)

      'Use AsyncResult.AsyncDelegate property to retrieve delegate
      Dim binOp As BinaryOperatorDelegate
      binOp = CType(asyncResult.AsyncDelegate, BinaryOperatorDelegate)

      'Call EndInvoke on delegate to get results
      Dim result As Integer = binOp.EndInvoke(ar)
      
      'Get the security token from the call context
      Dim ctxData As CallContextData
      ctxData = CType(CallContext.GetData("token"), CallContextData)
      Dim token As String = CType(ctxData.Data, String)

      'Get the server's return message from the call context
      ctxData = CType(CallContext.GetData("message"), CallContextData)
      Dim msg As String = CType(ctxData.Data, String)
      
      Console.WriteLine("The token is {0}", token)
      Console.WriteLine("The server says {0}", msg)

      Console.WriteLine("Add result is {0}", result)
   End Sub  

End Module
