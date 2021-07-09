Option Explicit On 
Option Strict On

Imports System
Imports System.Collections
Imports System.IO
Imports System.Runtime.Remoting
Imports System.Runtime.Remoting.Channels
Imports System.Runtime.Remoting.Messaging
Imports System.Threading

Public Class PriorityEmitterSink
    Inherits BaseChannelObjectWithProperties
    Implements IClientChannelSink, IMessageSink
    Private _nextMsgSink As IMessageSink

    Public Overrides ReadOnly Property Properties() As IDictionary _
    Implements IChannelSinkBase.Properties
        Get
            Return MyBase.Properties
        End Get
    End Property

    Public Function AsyncProcessMessage( _
        ByVal msg As IMessage, _
        ByVal replySink As IMessageSink) As IMessageCtrl _
        Implements IMessageSink.AsyncProcessMessage

        ' only for method calls
        If TypeOf (msg) Is IMethodCallMessage Then
            Dim lcc As LogicalCallContext = _
                CType(msg.Properties("__CallContext"), LogicalCallContext)

            lcc.SetData("priority", Thread.CurrentThread.Priority)
        End If

        Return _nextMsgSink.AsyncProcessMessage(msg, replySink)
    End Function

    Public Function SyncProcessMessage(ByVal msg As IMessage) As IMessage _
        Implements IMessageSink.SyncProcessMessage

        ' only for method calls 
        If TypeOf (msg) Is IMethodCallMessage Then
            Dim lcc As LogicalCallContext = _
                CType(msg.Properties("__CallContext"), LogicalCallContext)

            lcc.SetData("priority", Thread.CurrentThread.Priority)
        End If

        Return _nextMsgSink.SyncProcessMessage(msg)
    End Function

    Public Sub New(ByVal nextSink As IMessageSink)
        _nextMsgSink = nextSink
    End Sub

    Public ReadOnly Property NextSink() As IMessageSink _
    Implements IMessageSink.NextSink
        Get
            Return _nextMsgSink
        End Get
    End Property

    Public ReadOnly Property NextChannelSink() As IClientChannelSink _
    Implements IClientChannelSink.NextChannelSink
        Get
            Throw New RemotingException("Wrong sequence.")
        End Get
    End Property

    Public Sub AsyncProcessRequest( _
        ByVal sinkStack As IClientChannelSinkStack, _
        ByVal msg As IMessage, _
        ByVal headers As ITransportHeaders, _
        ByVal stream As Stream) _
        Implements IClientChannelSink.AsyncProcessRequest

        Throw New RemotingException("Wrong sequence.")
    End Sub

    Public Sub AsyncProcessResponse( _
        ByVal sinkStack As IClientResponseChannelSinkStack, _
        ByVal state As Object, _
        ByVal headers As ITransportHeaders, _
        ByVal stream As Stream) _
        Implements IClientChannelSink.AsyncProcessResponse

        Throw New RemotingException("Wrong sequence.")
    End Sub

    Public Function GetRequestStream( _
        ByVal msg As IMessage, _
        ByVal headers As ITransportHeaders) As Stream _
        Implements IClientChannelSink.GetRequestStream

        Throw New RemotingException("Wrong sequence.")
    End Function

    Public Sub ProcessMessage( _
        ByVal msg As IMessage, _
        ByVal requestHeaders As ITransportHeaders, _
        ByVal requestStream As Stream, _
        ByRef responseHeaders As ITransportHeaders, _
        ByRef responseStream As Stream) _
        Implements IClientChannelSink.ProcessMessage

        Throw New RemotingException("Wrong sequence.")
    End Sub
End Class

