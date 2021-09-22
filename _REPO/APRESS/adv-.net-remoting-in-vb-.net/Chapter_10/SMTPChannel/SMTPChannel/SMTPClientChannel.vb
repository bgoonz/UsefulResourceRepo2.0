Option Explicit On 
Option Strict On

Imports System
Imports System.Collections
Imports System.Runtime.Remoting.Channels
Imports System.Runtime.Remoting
Imports System.Runtime.Remoting.Messaging

Public Class SMTPClientChannel
    Inherits BaseChannelWithProperties
    Implements IChannelSender
    Private _properties As IDictionary
    Private _provider As IClientChannelSinkProvider
    Private _name As String

    Public Sub New( _
        ByVal properties As IDictionary, _
        ByVal clientSinkProvider As IClientChannelSinkProvider)

        _properties = properties
        _provider = clientSinkProvider
        _name = CType(_properties("name"), String)

        POP3PollManager.RegisterPolling( _
            CType(_properties("pop3Server"), String), _
            CType(_properties("pop3User"), String), _
            CType(_properties("pop3Password"), String), _
            Convert.ToInt32(CType(_properties("pop3PollInterval"), String)), _
            False)
    End Sub

    Public ReadOnly Property ChannelName() As String _
    Implements IChannelSender.ChannelName
        Get
            Return _name
        End Get
    End Property

    Public ReadOnly Property ChannelPriority() As Integer _
    Implements IChannelSender.ChannelPriority
        Get
            Return 0
        End Get
    End Property

    Public Function Parse( _
        ByVal url As String, _
        ByRef objectURI As String) As String _
        Implements IChannelSender.Parse

        Dim email As String
        SMTPHelper.parseURL(url, email, objectURI)

        If email Is Nothing OrElse email = "" OrElse objectURI Is Nothing _
        OrElse objectURI = "" Then

            Return Nothing
        Else
            Return "smtp:" + email
        End If
    End Function

    Public Function CreateMessageSink( _
        ByVal url As String, _
        ByVal remoteChannelData As Object, _
        ByRef objectURI As String) As IMessageSink _
        Implements IChannelSender.CreateMessageSink

        If (url Is Nothing) AndAlso _
        (Not remoteChannelData Is Nothing) AndAlso _
        (TypeOf remoteChannelData Is IChannelDataStore) Then

            Dim ds As IChannelDataStore = _
                CType(remoteChannelData, IChannelDataStore)
            url = ds.ChannelUris(0)
        End If

        ' format:   "smtp:user@host.domain/URI/to/object"
        If Not (url Is Nothing) AndAlso url.ToLower().StartsWith("smtp:") Then
            ' walk to last provider and this channel sink's provider
            Dim prov As IClientChannelSinkProvider = _provider
            While Not (prov.Next Is Nothing)
                prov = prov.Next
            End While

            prov.Next = New SMTPClientTransportSinkProvider( _
                    CType(_properties("senderEmail"), String), _
                    CType(_properties("smtpServer"), String))
            Dim dummy As String
            SMTPHelper.parseURL(url, dummy, objectURI)
            Dim msgsink As IMessageSink = CType(_provider.CreateSink( _
                Me, url, remoteChannelData), IMessageSink)
            Return msgsink
        Else
            objectURI = Nothing
            Return Nothing
        End If
    End Function
End Class
