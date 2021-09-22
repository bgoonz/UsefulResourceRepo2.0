Imports System.Runtime.Remoting.Messaging 'CallContext Class

Public Interface ISimpleMath
   Function Add(n1 As Integer, n2 As Integer) As Integer
   Function Subtract(n1 As Integer, n2 As Integer) As Integer
End Interface

Public Class SimpleMath
   Inherits MarshalByRefObject
   Implements ISimpleMath

   Public Function Add(n1 As Integer, n2 As Integer) As Integer _
      Implements ISimpleMath.Add
      
      'Get call context
      Dim ctxData As CallContextData 
      ctxData = CType(CallContext.GetData("token"), CallContextData)
      Dim token As String = CType(ctxData.Data, String)

      'Validate security token
      Console.WriteLine("Call context data: {0}", token)
      
      'Set some context data for return
      ctxData = new CallContextData("Hello from server")
      CallContext.SetData("message", ctxData)
      
      Return n1 + n2
   End Function
   
   Public Function Subtract(n1 As Integer, n2 As Integer) As Integer _
      Implements ISimpleMath.Subtract
      
      'Get call context
      Dim ctxData As CallContextData 
      ctxData = CType(CallContext.GetData("token"), CallContextData)
      Dim token As String = CType(ctxData.Data, String)

      'Validate security token
      Console.WriteLine("Call context data: {0}", token)
      
      Return n1 - n2
   End Function 
   
   Public Sub New()
      Console.WriteLine("SimpleMath ctor called")
   End Sub
End Class