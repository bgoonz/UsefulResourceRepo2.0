Option Explicit On 
Option Strict On

Imports System
Imports System.Runtime.Remoting.Channels
Imports System.Collections


Public Class CompressionClientSinkProvider
    Implements IClientChannelSinkProvider
    Private _nextProvider As IClientChannelSinkProvider

    Public Sub New(ByVal properties As IDictionary, ByVal providerData As ICollection)
        ' Not yet needed
    End Sub

    Public Property [Next]() As IClientChannelSinkProvider Implements IClientChannelSinkProvider.Next
        Get
            Return _nextProvider
        End Get
        Set(ByVal Value As IClientChannelSinkProvider)
            _nextProvider = Value
        End Set
    End Property

    Public Function CreateSink( _
        ByVal channel As IChannelSender, _
        ByVal url As String, _
        ByVal remoteChannelData As Object) As IClientChannelSink _
        Implements IClientChannelSinkProvider.CreateSink

        Dim nextSink As IClientChannelSink = _
            _nextProvider.CreateSink(channel, url, remoteChannelData)

        Return New CompressionClientSink(nextSink)
    End Function

End Class

