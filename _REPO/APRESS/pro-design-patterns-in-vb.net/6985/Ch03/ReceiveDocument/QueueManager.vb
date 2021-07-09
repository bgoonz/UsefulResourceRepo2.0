Option Strict On
Option Explicit On 

Imports System.Messaging
Imports System.Threading

Friend Class QueueManager
    Private Const QUEUE_NAME As String = "InboundDocuments"
    Private Shared m_Mutex As New Mutex()

    Public Shared Function GetQueue() As MessageQueue
        Dim msgQueue As MessageQueue
        Dim msgQueueName As String = ".\private$\" & QUEUE_NAME

        m_Mutex.WaitOne()

        If Not MessageQueue.Exists(msgQueueName) Then
            Try
                msgQueue = MessageQueue.Create(msgQueueName, True)
            Catch e As Exception
                Throw New Exception("Unable to create the " & QUEUE_NAME & " queue", e)
            Finally
                m_Mutex.ReleaseMutex()
            End Try
        Else
            Try
                msgQueue = New MessageQueue(msgQueueName)
            Catch e As Exception
                Throw New Exception("Unable to access the " & QUEUE_NAME & " queue", e)
            Finally
                m_Mutex.ReleaseMutex()
            End Try
        End If
        Return msgQueue

    End Function

End Class




