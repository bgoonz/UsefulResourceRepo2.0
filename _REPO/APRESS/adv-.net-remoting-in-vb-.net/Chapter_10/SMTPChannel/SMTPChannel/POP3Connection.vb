Option Explicit On 
Option Strict On

Imports System
Imports System.Net.Sockets
Imports System.Net
Imports System.IO
Imports System.Collections
Imports System.Text


Public Class POP3Connection

    Private Class MessageIndex
        ' will be used to store the result of the LIST command
        Friend Number As Integer
        Friend Bytes As Integer

        Friend Sub New(ByVal num As Integer, ByVal msgbytes As Integer)
            Number = num
            Bytes = msgbytes
        End Sub
    End Class

    Private _hostname As String
    Private _username As String
    Private _password As String
    Private _pop3Connection As TcpClient
    Private _pop3Stream As NetworkStream
    Private _pop3Response As StreamReader
    Private _msgs As IDictionary

    Public Sub New( _
        ByVal hostname As String, _
        ByVal username As String, _
        ByVal password As String)

        ' try to connect to the server with the supplied username
        ' and password.
        _hostname = hostname
        _username = username
        _password = password
        Try
            Connect()
        Catch e As Exception
            Try
                Disconnect()
            Catch ex As Exception ' ignore 
            End Try
            Throw e
        End Try
    End Sub

    Private Sub Connect()
        ' initialize the list of messages
        _msgs = New Hashtable()

        ' open the connection
        _pop3Connection = New TcpClient(_hostname, 110)
        _pop3Stream = _pop3Connection.GetStream()
        _pop3Response = New StreamReader(_pop3Stream)

        ' ignore first line (server's greeting)
        Dim response As String = _pop3Response.ReadLine()

        ' authenticate
        SendCommand("USER " + _username, True)
        SendCommand("PASS " + _password, True)

        ' retrieve the list of messages
        SendCommand("LIST", True)
        response = _pop3Response.ReadLine()
        While response <> "."
            ' add entries to _msgs dictionary
            Dim pos As Integer = response.IndexOf(" ")
            Dim msgnumStr As String = response.Substring(0, pos)
            Dim bytesStr As String = response.Substring(pos)
            Dim msgnum As Integer = Convert.ToInt32(msgnumStr)
            Dim bytes As Integer = Convert.ToInt32(bytesStr)
            Dim msgidx As New MessageIndex(msgnum, bytes)
            _msgs.Add(msgidx, msgnum)
            response = _pop3Response.ReadLine()
        End While
    End Sub

    Public ReadOnly Property MessageCount() As Integer
        Get
            ' returns the message count after connecting and
            ' issuing the LIST command
            Return _msgs.Count
        End Get
    End Property

    Public Function GetMessage(ByVal msgnum As Integer) As POP3Msg
        ' create the resulting object
        Dim tmpmsg As New POP3Msg()

        ' retrieve a single message
        SendCommand("RETR " & msgnum, True)
        Dim response As String = _pop3Response.ReadLine()

        ' read the response line by line and populate the
        ' correct properties of the POP3Msg object
        Dim headers As New StringBuilder()
        Dim body As New StringBuilder()
        Dim headersDone As Boolean = False
        While Not (response Is Nothing) AndAlso response <> "."
            ' check if all headers have been read
            If Not headersDone Then
                If response.Length > 0 Then
                    ' this will only parse the headers which are relevant
                    ' for .NET Remoting
                    If response.ToUpper().StartsWith("IN-REPLY-TO:") Then
                        tmpmsg.InReplyTo = response.Substring(12).Trim()
                    Else
                        If response.ToUpper().StartsWith("MESSAGE-ID:") Then
                            tmpmsg.MessageId = response.Substring(11).Trim()
                        Else
                            If response.ToUpper().StartsWith("FROM:") Then
                                tmpmsg.MsgFrom = response.Substring(5).Trim()
                            Else
                                If response.ToUpper().StartsWith("TO:") Then
                                    tmpmsg.MsgTo = response.Substring(3).Trim()
                                End If
                            End If
                        End If
                    End If
                    headers.Append(response).Append(ControlChars.Lf)
                Else
                    headersDone = True
                End If
            Else
                ' all headers have been read, add the rest to
                ' the body. 
                ' For .NET Remoting, we need the body in a single 
                ' line to decode Base64 therefore no <CR><LF>s will
                ' be appended!
                body.Append(response)
            End If

            ' read next line
            response = _pop3Response.ReadLine()
        End While

        ' set the complete header and body Strings of POP3Msg
        tmpmsg.Body = body.ToString()
        tmpmsg.Headers = headers.ToString()
        Return tmpmsg
    End Function

    Public Sub DeleteMessage(ByVal msgnum As Integer)
        ' issue the DELE command to delete the specified message
        SendCommand("DELE " & msgnum, True)
    End Sub

    Public Sub Disconnect()
        ' sends QUIT and disconnects
        Try
            ' send QUIT to commit the DELEs
            SendCommand("QUIT", False)
        Finally
            ' close the connection
            _pop3Stream.Close()
            _pop3Response.Close()
            _pop3Connection.Close()
        End Try
    End Sub


    Private Sub SendCommand(ByVal command As String, ByVal needOK As Boolean)
        ' sends a single command. 
        ' if needOK is set it will check the response to begin
        ' with "+OK" and will throw an exception if it doesn't.
        command = command + ControlChars.Cr + ControlChars.Lf
        Dim cmd As Byte() = Encoding.ASCII.GetBytes(command)

        ' send the command
        _pop3Stream.Write(cmd, 0, cmd.Length)
        Dim response As String = _pop3Response.ReadLine()

        ' check the response
        If needOK Then
            If Not response.Substring(0, 3).ToUpper().Equals("+OK") Then
                Throw New Exception("POP3 Server returned unexpected " & _
                    "response:" + ControlChars.Lf + "'" + response + "'")
            End If
        End If
    End Sub
End Class
