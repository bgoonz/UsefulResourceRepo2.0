Option Explicit On 
Option Strict On

Imports System
Imports System.Collections
Imports System.Runtime.Remoting.Channels
Imports System.Runtime.Remoting
Imports System.Runtime.Remoting.Messaging

Public Class SMTPChannel
    Inherits BaseChannelWithProperties
    Implements IChannelSender, IChannelReceiver

    Private _clientchannel As SMTPClientChannel
    Private _serverchannel As SMTPServerChannel
    Private _name As String

    Public Sub New( _
        ByVal properties As IDictionary, _
        ByVal clientSinkProvider As IClientChannelSinkProvider, _
        ByVal serverSinkProvider As IServerChannelSinkProvider)

        If clientSinkProvider Is Nothing Then
            clientSinkProvider = New SoapClientFormatterSinkProvider()
        End If
        _clientchannel = New SMTPClientChannel(properties, clientSinkProvider)

        If Not (properties("isServer") Is Nothing) AndAlso _
        CType(properties("isServer"), String) = "yes" Then
            If serverSinkProvider Is Nothing Then
                serverSinkProvider = New SoapServerFormatterSinkProvider()
            End If
            _serverchannel = New SMTPServerChannel(properties, _ 
                serverSinkProvider)
        End If

        _name = CType(properties("name"), String)
    End Sub

    Public Function CreateMessageSink( _
        ByVal url As String, _
        ByVal remoteChannelData As Object, _
        ByRef objectURI As String) As IMessageSink _
        Implements IChannelSender.CreateMessageSink

        Return _clientchannel.CreateMessageSink(url, remoteChannelData, _ 
            objectURI)
    End Function

    Public Function Parse( _
        ByVal url As String, _
        ByRef objectURI As String) As String _
        Implements IChannelReceiver.Parse

        Return _clientchannel.Parse(url, objectURI)
    End Function

    Public ReadOnly Property ChannelName() As String _
    Implements IChannel.ChannelName
        Get
            Return _name
        End Get
    End Property

    Public ReadOnly Property ChannelPriority() As Integer _
    Implements IChannel.ChannelPriority
        Get
            Return 0
        End Get
    End Property

    Public Sub StartListening(ByVal data As Object) _
    Implements IChannelReceiver.StartListening
        If Not (_serverchannel Is Nothing) Then
            _serverchannel.StartListening(data)
        End If
    End Sub

    Public Sub StopListening(ByVal data As Object) _
    Implements IChannelReceiver.StopListening
        If Not (_serverchannel Is Nothing) Then
            _serverchannel.StopListening(data)
        End If
    End Sub

    Public Function GetUrlsForUri(ByVal objectURI As String) As String() _
    Implements IChannelReceiver.GetUrlsForUri
        If Not (_serverchannel Is Nothing) Then
            Return _serverchannel.GetUrlsForUri(objectURI)
        Else
            Return Nothing
        End If
    End Function

    Public ReadOnly Property ChannelData() As Object _
    Implements IChannelReceiver.ChannelData
        Get
            If Not (_serverchannel Is Nothing) Then
                Return _serverchannel.ChannelData
            Else
                Return Nothing
            End If
        End Get
    End Property
End Class
