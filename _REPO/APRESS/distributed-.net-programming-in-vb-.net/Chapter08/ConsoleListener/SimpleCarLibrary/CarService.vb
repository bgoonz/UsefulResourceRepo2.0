'All the important enterprise service types are contained here.
Imports System.EnterpriseServices
Imports System.Runtime.InteropServices 'For GUID attribute
Imports System.Text 'For StringBuilder

<Guid("5A1BB09D-8D4B-481a-A441-DC6D8D48F396")> _
Public Interface IGetInfo
   Function GetInfo() as String
   Sub AnotherMethod()
End Interface

 'Class requires JIT activation
<JustInTimeActivation(), _
 EventTrackingEnabled(), _
 ClassInterface(ClassInterfaceType.None)> _
Public Class CarService
   Inherits ServicedComponent
   Implements IGetInfo

   Public Function GetInfo() As String Implements IGetInfo.GetInfo
      Dim ctxInfo As New StringBuilder()

      'Use ContextUtil to fetch context information
      ctxInfo.AppendFormat("Context ID:  {0}{1}", _
         ContextUtil.ContextId, vbCrLf)
      ctxInfo.AppendFormat("Activity ID: {0}{1}", _
         ContextUtil.ActivityId, vbCrLf)

      'If in transaction, get transaction ID
      Dim txId As String = "No Tx"
      If ContextUtil.IsInTransaction Then
         txId = ContextUtil.TransactionId.ToString()
      End If

      ctxInfo.AppendFormat("Transaction ID:    {0}{1}", txId, vbCrLf)
      ctxInfo.AppendFormat("Security Enabled?: {0}{1}", _
         ContextUtil.IsSecurityEnabled, vbCrLf)
         
      Return ctxInfo.ToString()
   End Function
   
   Public Sub AnotherMethod() Implements IGetInfo.AnotherMethod
   End Sub   
   
   Public Sub New
   End Sub   

End Class

