Option Explicit On 
Option Strict On

Imports System
Imports System.Collections
Imports System.Threading

Public Class POP3PollManager
    ' dictionary of polling instances
    Private Shared _listeners As IDictionary = _
        Hashtable.Synchronized(New Hashtable())

    ' number of sent messages for which no response has been received
    Private Shared _pendingResponses As Integer
    Private Shared _lastPendingResponses As Integer

    Public Shared Sub RegisterPolling( _
        ByVal hostname As String, _
        ByVal username As String, _
        ByVal password As String, _
        ByVal pollInterval As Integer, _
        ByVal isServer As Boolean)

        Dim key As String = username + "|" + hostname
        Dim pop3 As POP3Polling = CType(_listeners(key), POP3Polling)
        If pop3 Is Nothing Then
            ' create a new listener
            pop3 = New POP3Polling(hostname, username, password, _
                pollInterval, isServer)

            _listeners(key) = pop3
        Else
            ' change to server-mode if needed
            If Not pop3._isServer And isServer Then
                pop3._isServer = True
            End If

            ' check for pollInterval => lowest interval will be taken
            If Not pop3._pollInterval > pollInterval Then
                pop3._pollInterval = pollInterval
            End If
        End If
        pop3.CheckAndStartPolling()
    End Sub

    Friend Shared Sub RequestSent()
        _pendingResponses += 1
        If _lastPendingResponses <= 0 And _pendingResponses > 0 Then
            Dim enmr As IEnumerator = _listeners.GetEnumerator()
            While enmr.MoveNext()
                Dim entr As DictionaryEntry = CType(enmr.Current, DictionaryEntry)
                Dim pop3 As POP3Polling = CType(entr.Value, POP3Polling)
                pop3._needsPolling = True
                pop3.CheckAndStartPolling()
            End While
        End If
        _lastPendingResponses = _pendingResponses
    End Sub


    Friend Shared Sub ResponseReceived()
        _pendingResponses -= 1
        If _pendingResponses <= 0 Then
            Dim enmr As IEnumerator = _listeners.GetEnumerator()
            While enmr.MoveNext()
                Dim entr As DictionaryEntry = CType(enmr.Current, DictionaryEntry)
                Dim pop3 As POP3Polling = CType(entr.Value, POP3Polling)
                pop3._needsPolling = False
            End While
        End If
        _lastPendingResponses = _pendingResponses
    End Sub
End Class
