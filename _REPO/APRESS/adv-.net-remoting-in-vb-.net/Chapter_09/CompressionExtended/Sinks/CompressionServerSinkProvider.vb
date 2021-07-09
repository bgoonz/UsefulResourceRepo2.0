Option Explicit On 
Option Strict On

Imports System
Imports System.Runtime.Remoting.Channels
Imports System.Collections

Public Class CompressionServerSinkProvider
    Implements IServerChannelSinkProvider
    Private _nextProvider As IServerChannelSinkProvider

    Public Sub New(ByVal properties As IDictionary, ByVal providerData As ICollection)
        ' not yet needed
    End Sub


    Public Property [Next]() As IServerChannelSinkProvider _
        Implements IServerChannelSinkProvider.Next
        Get
            Return _nextProvider
        End Get
        Set(ByVal Value As IServerChannelSinkProvider)
            _nextProvider = Value
        End Set
    End Property

    Public Function CreateSink( _
        ByVal channel As IChannelReceiver) As IServerChannelSink _
        Implements IServerChannelSinkProvider.CreateSink

        ' create other sinks in the chain
        Dim nextSink As IServerChannelSink = _
            _nextProvider.CreateSink(channel)

        ' put our sink on top of the chain and return it				
        Return New CompressionServerSink(nextSink)
    End Function

    Public Sub GetChannelData(ByVal channelData As IChannelDataStore) _
    Implements IServerChannelSinkProvider.GetChannelData
        ' not needed
    End Sub
End Class

