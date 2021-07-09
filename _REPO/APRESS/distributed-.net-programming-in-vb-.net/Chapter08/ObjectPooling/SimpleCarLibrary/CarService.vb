'All the important enterprise service types are contained here.
Imports System.EnterpriseServices
Imports System.Runtime.InteropServices 'For GUID attribute
Imports System.Text 'For StringBuilder

<Guid("5A1BB09D-8D4B-481a-A441-DC6D8D48F396")> _
Public Interface IGetInfo
   Function GetInfo() As String
   Sub AnotherMethod()
End Interface

<EventTrackingEnabled(), _
 JustInTimeActivation(), _
 ClassInterface(ClassInterfaceType.None), _
 ObjectPooling(5, 10)> _
Public Class CarService
   Inherits ServicedComponent
   Implements IGetInfo
      
   Public Sub New
      Dim logMsg As String = string.Format("Created Object: {0}", _
         Me.GetHashCode())
      EventLog.WriteEntry("CarService.ctor", logMsg)
   End Sub   

   Protected Overrides Sub Activate()
      Dim logMsg As String = String.Format("Activated Object: {0}", _
         Me.GetHashCode())
      EventLog.WriteEntry("CarService.Activate", logMsg)
   End Sub

   Protected Overrides Function CanBePooled() As Boolean
      Dim logMsg As String = string.Format("Object {0} not pooled", _
         Me.GetHashCode())
      EventLog.WriteEntry("CarService.CanBePooled", logMsg)
      Return True
   End Function

   Protected Overrides Sub Deactivate()
      Dim logMsg As String = String.Format("Deactivated Object: {0}", _
         Me.GetHashCode())
      EventLog.WriteEntry("CarService.Deactivate", logMsg)
   End Sub
   
   Protected Overrides Sub Finalize()
      Dim logMsg As String = String.Format("Object {0} Finalized", _
         Me.GetHashCode())
      EventLog.WriteEntry("CarService.Finalize", logMsg)
      MyBase.Finalize()
   End Sub
   
   Public Function GetInfo() As String Implements IGetInfo.GetInfo
      Dim ctxInfo As New StringBuilder()

      'Use ContextUtil to fetch context information
      ctxInfo.AppendFormat("Context ID:  {0}{1}", _
         ContextUtil.ContextId, vbNewline)
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
         
      ContextUtil.SetComplete()
         
      Return ctxInfo.ToString()
   End Function
   
   Public Sub AnotherMethod() Implements IGetInfo.AnotherMethod
      ContextUtil.SetComplete()
   End Sub   
End Class

