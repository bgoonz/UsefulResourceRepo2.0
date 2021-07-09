'All the important enterprise service types are contained here.
Imports System.EnterpriseServices
Imports System.Runtime.InteropServices 'For GUID attribute
Imports System.Text 'For StringBuilder

 'Class requires JIT activation
<JustInTimeActivation(), _
 Guid("00E1160C-F65B-45fa-A92D-C24AB92831C8"), _
 EventTrackingEnabled()> _
Public Class CarService
   Inherits ServicedComponent
   
   ' Serviced components require a default constructor.
   Public Sub New()
   End Sub
   
   Public Function GetInfo() As String
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

End Class
