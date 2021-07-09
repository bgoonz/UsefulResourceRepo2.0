Option Strict On
Option Explicit On 

Imports System.Messaging
Imports System.Threading
Imports System.Data.SqlClient

Public Class Receive

    Private Const CONNECT_STRING As String = "server=Localhost;uid=DocWrox;database=NWindOrderStatus"
    Private Shared m_Instance As Receive
    Private Shared m_MsgQueue As MessageQueue
    Private m_Pickup As New Pickup()

    Public Shared Function GetInstance() As Receive
        If m_Instance Is Nothing Then
            m_Instance = New Receive()
            m_MsgQueue = QueueManager.GetQueue
        End If
        Return m_Instance
    End Function

    Private Sub New()
    End Sub

    Public Function Persist(ByVal xmlText As String) As String
        Dim docID As String
        Try
            docID = SendMessage(xmlText)
        Catch e As Exception
            Throw New Exception("Unable to receive document", e)
        End Try
        m_Pickup.Execute(docID)
        Return docID
    End Function

    Public Function GetStatus(ByVal docID As String) As String
        Dim result As String
        Dim sql As String
        Dim cn As SqlConnection
        Dim cmd As SqlCommand
        Dim param As SqlParameter

        sql = "SELECT TOP 1 Status FROM DocumentStatus"
        sql &= " WHERE DocumentID='" & docID & "'"
        sql &= " ORDER BY StatusID DESC"

        Try
            Console.WriteLine("About to create connection") 'DEBUG
            cn = New SqlConnection(CONNECT_STRING)
            If Not cn Is Nothing Then
                Console.WriteLine("Connection created") 'DEBUG
            Else
                Console.WriteLine("Connection creation failed") 'DEBUG
            End If

            cmd = New SqlCommand()
            With cmd
                .CommandType = CommandType.Text
                .CommandText = sql
                .Connection = cn
            End With
            cn.Open()
            result = CStr(cmd.ExecuteScalar())
            If result Is Nothing Then
                result = "Pending"
            End If
            Return result
        Catch e As Exception
            Throw New Exception("Unable to retrieve status for DocID = " & docID, e)
        Finally
            cn.Close()
        End Try
    End Function

    Private Function SendMessage(ByVal xmlText As String) As String
        Dim docID As String
        Dim msgDoc As New Message()
        Dim msqTrx As New MessageQueueTransaction()

        With msgDoc
            .Label = Now.ToUniversalTime.ToString
            .Formatter = New BinaryMessageFormatter()
            .Recoverable = True
            .Body = xmlText
        End With

        Try
            msqTrx.Begin()
            m_MsgQueue.Send(msgDoc, msqTrx)
            docID = msgDoc.Id
            msqTrx.Commit()
        Catch e As Exception
            msqTrx.Abort()
            Throw New Exception( _
            "Unable to send message to the " & m_MsgQueue.QueueName & _
            " queue", e)
        Finally
            m_MsgQueue.Close()
        End Try
        Return docID
    End Function


End Class
