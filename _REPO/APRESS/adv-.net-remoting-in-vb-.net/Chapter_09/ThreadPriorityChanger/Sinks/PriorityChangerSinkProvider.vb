Option Explicit On 
Option Strict On

Imports System
Imports System.Collections
Imports System.Runtime.Remoting.Channels
Imports System.Runtime.Remoting.Messaging

Public Class PriorityChangerSinkProvider
    Implements IServerChannelSinkProvider

    Private _next As IServerChannelSinkProvider = Nothing

    Public Sub New(ByVal properties As IDictionary, _
        ByVal providerData As ICollection)

        ' not needed
    End Sub

    Public Sub GetChannelData(ByVal channelData As IChannelDataStore) _
    Implements IServerChannelSinkProvider.GetChannelData
        ' not needed
    End Sub

    Public Function CreateSink( _
        ByVal channel As IChannelReceiver) As IServerChannelSink _
        Implements IServerChannelSinkProvider.CreateSink

        Dim nextSink As IServerChannelSink = _next.CreateSink(channel)
        Return New PriorityChangerSink(nextSink)
    End Function

    Public Property [Next]() As IServerChannelSinkProvider _
        Implements IServerChannelSinkProvider.Next
        Get
            Return _next
        End Get
        Set(ByVal Value As IServerChannelSinkProvider)
            _next = Value
        End Set
    End Property

End Class
