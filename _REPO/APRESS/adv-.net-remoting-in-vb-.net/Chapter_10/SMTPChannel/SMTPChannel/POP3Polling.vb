Option Explicit On 
Option Strict On

Imports System
Imports System.Collections
Imports System.Threading

Public Class POP3Polling

    Delegate Sub HandleMessageDelegate(ByVal msg As POP3Msg)

    ' if it's a remoting server, we will poll forever
    Friend _isServer As Boolean

    ' if this is not a server, this property has to be set to 
    ' start polling
    Friend _needsPolling As Boolean

    ' is currently polling
    Friend _isPolling As Boolean

    ' polling interval in seconds
    Friend _pollInterval As Integer

    ' logon data
    Private _hostname As String
    Private _username As String
    Private _password As String

    Friend Sub New( _
        ByVal hostname As String, ByVal username As String, _
        ByVal password As String, ByVal pollInterval As Integer, _
        ByVal isServer As Boolean)

        _hostname = hostname
        _username = username
        _password = password
        _pollInterval = pollInterval
        _isServer = isServer

        If Not _isServer Then
            _needsPolling = False
        End If
    End Sub


    Private Sub Poll()
        If _isPolling Then
            Return
        End If
        _isPolling = True
        Do
            Thread.Sleep((_pollInterval * 1000))

            Dim pop As New POP3Connection(_hostname, _username, _password)
            Dim i As Integer
            For i = 1 To pop.MessageCount
                Dim msg As POP3Msg = pop.GetMessage(i)
                Dim del As New HandleMessageDelegate( _  
                    AddressOf SMTPHelper.MessageReceived)
                del.BeginInvoke(msg, Nothing, Nothing)
                pop.DeleteMessage(i)
            Next i
            pop.Disconnect()
            pop = Nothing
        Loop While _isServer Or _needsPolling
        _isPolling = False
    End Sub

    Friend Sub CheckAndStartPolling()
        If _isPolling Then
            Return
        End If
        If _isServer Or _needsPolling Then
            Dim thr As New Thread(New ThreadStart(AddressOf Me.Poll))
            thr.Start()
            thr.IsBackground = True
        End If
    End Sub
End Class

