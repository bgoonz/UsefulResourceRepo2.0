Option Explicit On 
Option Strict On

Imports System
Imports System.Collections
Imports System.Runtime.Remoting.Channels
Imports System.Runtime.Remoting
Imports System.Runtime.Remoting.Messaging

Public Class SMTPClientTransportSinkProvider
    Implements IClientChannelSinkProvider

    Private _senderEmailAddress As String
    Private _smtpServer As String

    Public Sub New( _ 
        ByVal senderEmailAddress As String, _
        ByVal smtpServer As String)

        _senderEmailAddress = senderEmailAddress
        _smtpServer = smtpServer
    End Sub

    Public Function CreateSink( _ 
        ByVal channel As IChannelSender, _ 
        ByVal url As String, _ 
        ByVal remoteChannelData As Object) As IClientChannelSink _
        Implements IClientChannelSinkProvider.CreateSink

        Dim destinationEmailAddress As String
        Dim objectURI As String
        SMTPHelper.parseURL(url, destinationEmailAddress, objectURI)
        Return New SMTPClientTransportSink(destinationEmailAddress, _senderEmailAddress, _smtpServer, objectURI)
    End Function

    Public Property [Next]() As IClientChannelSinkProvider _
    Implements IClientChannelSinkProvider.Next
        Get
            Return Nothing
        End Get
        Set(ByVal Value As IClientChannelSinkProvider)
            ' ignore as this has to be the last provider in the chain
        End Set
    End Property
End Class
