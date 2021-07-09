Option Explicit On 
Option Strict On

Imports System
Imports System.Collections
Imports System.Runtime.Remoting.Channels
Imports System.Runtime.Remoting.Messaging

Public Class PriorityEmitterSinkProvider
    Implements IClientChannelSinkProvider

    Private _next As IClientChannelSinkProvider = Nothing

    Public Sub New(ByVal properties As IDictionary, _
        ByVal providerData As ICollection)

        ' not needed
    End Sub

    Public Function CreateSink( _
        ByVal channel As IChannelSender, _
        ByVal url As String, _
        ByVal remoteChannelData As Object) As IClientChannelSink _
        Implements IClientChannelSinkProvider.CreateSink

        Dim nextsink As IClientChannelSink = _
            _next.CreateSink(channel, url, remoteChannelData)

        Return New PriorityEmitterSink(CType(nextsink, IMessageSink))
    End Function

    Public Property [Next]() As IClientChannelSinkProvider _
    Implements IClientChannelSinkProvider.Next
        Get
            Return _next
        End Get
        Set(ByVal Value As IClientChannelSinkProvider)
            _next = Value
        End Set
    End Property
End Class
