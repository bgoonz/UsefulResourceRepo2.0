Option Explicit On 
Option Strict On

Imports System
Imports System.Net.Sockets
Imports System.Net
Imports System.IO
Imports System.Text

Public Class SMTPConnection
    Private _hostname As String
    Private _smtpConnection As TcpClient
    Private _smtpStream As NetworkStream
    Private _smtpResponse As StreamReader

    Public Sub New(ByVal hostname As String)
        _hostname = hostname
    End Sub

    Private Sub Connect()
        _smtpConnection = New TcpClient(_hostname, 25)
        _smtpStream = _smtpConnection.GetStream()
        _smtpResponse = New StreamReader(_smtpStream)
    End Sub

    Private Sub Disconnect()
        _smtpStream.Close()
        _smtpResponse.Close()
        _smtpConnection.Close()
    End Sub

    Private Sub SendCommand( _
        ByVal command As String, _
        ByVal expectedResponseClass As Integer)

        ' command: the SMPT command to send
        ' expectedResponseClass: first digit of the expected smtp response
        ' Throws an exception if the server's responsecode's first 
        ' digit (resonse class) is > the expectedResponseClass. 
        ' If expectedResponseClass == 0, it will be ignored
        command = command + ControlChars.Cr + ControlChars.Lf
        Dim cmd As Byte() = Encoding.ASCII.GetBytes(command)
        _smtpStream.Write(cmd, 0, cmd.Length)
        Dim response As String = _smtpResponse.ReadLine()

        If expectedResponseClass <> 0 Then
            Dim resp As Integer = Convert.ToInt32(response.Substring(0, 1))
            If resp > expectedResponseClass Then
                Throw New Exception("SMTP Server returned unexpected " & _
                    "response:" + ControlChars.Lf + "'" + response + "'")
            End If
        End If
    End Sub

    Public Sub SendMessage( _
        ByVal msgFrom As String, _
        ByVal msgTo As String, _
        ByVal text As String)

        Try
            Connect()
            SendCommand("HELO localhost", 2)
            SendCommand("MAIL FROM: <" + msgFrom + ">", 2)
            SendCommand("RCPT TO: <" + msgTo + ">", 2)
            SendCommand("DATA", 3)
            Dim bodybytes As Byte() = _
                Encoding.ASCII.GetBytes(text + ControlChars.Cr + ControlChars.Lf)
            _smtpStream.Write(bodybytes, 0, bodybytes.Length)
            SendCommand(".", 3)
            SendCommand("QUIT", 0)
        Finally
            Try
                Disconnect()
            Catch e As Exception 'ignore
            End Try
        End Try
    End Sub
End Class
