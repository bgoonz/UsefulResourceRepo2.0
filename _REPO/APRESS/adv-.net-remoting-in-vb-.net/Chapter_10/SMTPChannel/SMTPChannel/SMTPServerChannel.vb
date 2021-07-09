Option Explicit On 
Option Strict On

Imports System
Imports System.Collections
Imports System.Runtime.Remoting.Channels
Imports System.Runtime.Remoting
Imports System.Runtime.Remoting.Messaging

Public Class SMTPServerChannel
    Inherits BaseChannelWithProperties
    Implements IChannelReceiver, IChannel
    Private _myAddress As String
    Private _name As String
    Private _smtpServer As String
    Private _pop3Server As String
    Private _pop3Username As String
    Private _pop3Password As String
    Private _pop3Pollingtime As Integer

    Private _transportSink As SMTPServerTransportSink
    Private _sinkProvider As IServerChannelSinkProvider
    Private _properties As IDictionary

    Private _channelData As ChannelDataStore

    Public Sub New( _ 
        ByVal properties As IDictionary, _ 
        ByVal serverSinkProvider As IServerChannelSinkProvider)

        _sinkProvider = serverSinkProvider
        _properties = properties
        _myAddress = CType(_properties("senderEmail"), String)
        _name = CType(_properties("name"), String)
        _pop3Server = CType(_properties("pop3Server"), String)
        _smtpServer = CType(_properties("smtpServer"), String)
        _pop3Username = CType(_properties("pop3User"), String)
        _pop3Password = CType(_properties("pop3Password"), String)
        _pop3Pollingtime = Convert.ToInt32(CType(_properties("pop3PollInterval"), String))

        ' needed for CAOs!
        Dim urls As String() = {Me.GetURLBase()}
        _channelData = New ChannelDataStore(urls)
        ' collect channel data from all providers
        Dim provider As IServerChannelSinkProvider = _sinkProvider
        While Not (provider Is Nothing)
            provider.GetChannelData(_channelData)
            provider = provider.Next
        End While

        ' create the sink chain
        Dim snk As IServerChannelSink = _ 
            ChannelServices.CreateServerChannelSinkChain(_sinkProvider, Me)
        ' add the SMTPServerTransportSink as a first element to the chain
        _transportSink = _ 
            New SMTPServerTransportSink(snk, _smtpServer, _myAddress)
        ' start to listen
        Me.StartListening(Nothing)
    End Sub

    Private Function GetURLBase() As String
        Return "smtp:" + _myAddress
    End Function

    Public Function Parse( _ 
        ByVal url As String, _ 
        ByRef objectURI As String) As String _
        Implements IChannel.Parse

        Dim email As String
        SMTPHelper.parseURL(url, email, objectURI)
        If email Is Nothing OrElse email = "" _ 
        OrElse objectURI Is Nothing OrElse objectURI = "" Then
            Return Nothing
        Else
            Return "smtp:" + email
        End If
    End Function

    Public ReadOnly Property ChannelName() As String _
    Implements IChannelReceiver.ChannelName
        Get
            Return _name
        End Get
    End Property

    Public ReadOnly Property ChannelPriority() As Integer _
    Implements IChannelReceiver.ChannelPriority
        Get
            Return 0
        End Get
    End Property

    Public Sub StartListening(ByVal data As Object) _
        Implements IChannelReceiver.StartListening
        ' register the POP3 account for polling
        POP3PollManager.RegisterPolling( _ 
            _pop3Server, _pop3Username, _pop3Password, _pop3Pollingtime, True)

        ' register the email address as a server
        SMTPHelper.RegisterServer(_transportSink, _myAddress)
    End Sub

    Public Sub StopListening(ByVal data As Object) _
    Implements IChannelReceiver.StopListening
        ' Not implemented
    End Sub

    Public Function GetUrlsForUri(ByVal objectURI As String) As String() _
        Implements IChannelReceiver.GetUrlsForUri

        Dim urls() As String
        urls = New String(1) {}
        If Not objectURI.StartsWith("/") Then
            objectURI = "/" + objectURI
        End If
        urls(0) = Me.GetURLBase() + objectURI
        Return urls
    End Function

    Public ReadOnly Property ChannelData() As Object _
        Implements IChannelReceiver.ChannelData
        Get
            Return _channelData
        End Get
    End Property
End Class
