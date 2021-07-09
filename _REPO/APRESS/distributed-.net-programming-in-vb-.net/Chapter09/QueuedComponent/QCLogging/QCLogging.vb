Imports System.EnterpriseServices
Imports COMSVCSLib

Public Interface IQueuableLogger
   Sub Write(msg As String)
End Interface

<InterfaceQueuing(Interface := "QCLogging.IQueuableLogger,QCLogging"), _
 ExceptionClass("QCLogging.LoggerException")> _
Public Class Logger
   Inherits ServicedComponent
   Implements IQueuableLogger

   Public Sub Write(msg As String) Implements IQueuableLogger.Write
      EventLog.WriteEntry("Queued Logger", msg)
   End Sub
End Class

Public Class LoggerException 
   Implements IPlaybackControl
   Implements IQueuableLogger

   Public Sub FinalClientRetry() Implements IPlaybackControl.FinalClientRetry
      'This is called on the client side if the message fails
      'to reach the queue
   End Sub

   Public Sub FinalServerRetry() Implements IPlaybackControl.FinalServerRetry
      'This is called when the message lands on the dead queue.
   End Sub

   Public Sub Write(msg As String) Implements IQueuableLogger.Write
      'After FinalServerRetry, the methods in the message are
      'invoked on this exception class. This allows you to log
      'detailed information or attempt to undo the operation.
   End Sub
End Class
