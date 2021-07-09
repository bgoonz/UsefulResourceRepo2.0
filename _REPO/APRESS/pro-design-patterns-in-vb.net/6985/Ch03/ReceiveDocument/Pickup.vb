Option Strict On
Option Explicit On 

Imports System.Threading
Imports System.Messaging
Imports ProcessDocument.OrderManager


Public Class Pickup

    Public Sub Execute(ByVal docID As String)
        Dim thread As Thread

        thread = New Thread(AddressOf New PickupAndProcess(docID).Execute)
        With thread
            .IsBackground = False
            .Start()
        End With
    End Sub

    Private Class PickupAndProcess

        Dim m_DocID As String

        Sub New(ByVal docID As String)
            m_DocID = docID
        End Sub

        Sub Execute()
            Dim xmlText As String
            Dim msgQueue As MessageQueue
            Dim msgDoc As New Message()
            Dim msqTrx As New MessageQueueTransaction()
            Dim manageOrder As New ProcessDocument.OrderManager()

            msgQueue = QueueManager.GetQueue
            msgQueue.Formatter = New BinaryMessageFormatter()
            Try
                msqTrx.Begin()
                msgDoc = msgQueue.ReceiveById(m_DocID, msqTrx)
                xmlText = CStr(msgDoc.Body)
                manageOrder.Load(m_DocID, xmlText)
                msqTrx.Commit()
            Catch
                msqTrx.Abort()
            Finally
                msgQueue.Close()
            End Try
        End Sub

    End Class


End Class
