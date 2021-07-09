Option Strict On
Option Explicit On 

Imports System.Messaging

Friend Class SimpleQueueManager

    Private Const QUEUE_NAME As String = "NewOrders"

    Public Shared Function GetQueue() As MessageQueue
        Dim msgQueue As MessageQueue
        Dim msgQueueName As String = ".\private$\" & QUEUE_NAME
        If Not MessageQueue.Exists(msgQueueName) Then
            Try
                msgQueue = MessageQueue.Create(msgQueueName)
            Catch e As Exception
                Throw New Exception("Unable to create the " & QUEUE_NAME & _
                                                                 " queue", e)
            End Try
        Else
            Try
                msgQueue = New MessageQueue(msgQueueName)
            Catch e As Exception
                Throw New Exception("Unable to access the " & QUEUE_NAME & _
                                                                 " queue", e)
            End Try
        End If
        Return msgQueue
    End Function

End Class
