Option Explicit On 
Option Strict On

Imports System
Imports System.Collections
Imports System.IO
Imports System.Runtime.Remoting
Imports System.Runtime.Remoting.Messaging
Imports System.Runtime.Remoting.Channels
Imports System.Threading

Public Class PriorityChangerSink
    Inherits BaseChannelObjectWithProperties
    Implements IServerChannelSink, IChannelSinkBase 'ToDo: Add Implements Clauses for implementation methods of these interface(s)

    Private _next As IServerChannelSink

    Public Sub New(ByVal nextSink As IServerChannelSink)
        _next = nextSink
    End Sub

    Public Overrides ReadOnly Property Properties() As IDictionary _
    Implements IChannelSinkBase.Properties
        Get
            Return MyBase.Properties
        End Get
    End Property

    Public Sub AsyncProcessResponse( _
        ByVal sinkStack As IServerResponseChannelSinkStack, _
        ByVal state As Object, _
        ByVal msg As IMessage, _
        ByVal headers As ITransportHeaders, _
        ByVal stream As Stream) _
        Implements IServerChannelSink.AsyncProcessResponse

        ' restore the priority
        Dim priority As ThreadPriority = CType(state, ThreadPriority)
        Console.WriteLine("  -> Post-execution change back to {0}", priority)
        Thread.CurrentThread.Priority = priority
    End Sub

    Public Function GetResponseStream( _
        ByVal sinkStack As IServerResponseChannelSinkStack, _
        ByVal state As System.Object, _
        ByVal msg As IMessage, _
        ByVal headers As ITransportHeaders) As Stream _
        Implements IServerChannelSink.GetResponseStream

        Return Nothing
    End Function

    Public Function ProcessMessage( _
        ByVal sinkStack As IServerChannelSinkStack, _
        ByVal requestMsg As IMessage, _
        ByVal requestHeaders As ITransportHeaders, _
        ByVal requestStream As Stream, _
        ByRef responseMsg As IMessage, _
        ByRef responseHeaders As ITransportHeaders, _
        ByRef responseStream As Stream) As ServerProcessing _
        Implements IServerChannelSink.ProcessMessage

        Dim lcc As LogicalCallContext = CType(requestMsg.Properties("__CallContext"), LogicalCallContext)

        ' storing the current priority
        Dim oldprio As ThreadPriority = Thread.CurrentThread.Priority

        ' check if the logical call context contains "priority"
        If (Not lcc Is Nothing) AndAlso _
            (Not lcc.GetData("priority") Is Nothing) Then

            ' fetch the priorty from the call context
            Dim priority As ThreadPriority = CType(lcc.GetData("priority"), _
                ThreadPriority)

            Console.WriteLine("  -> Pre-execution priority change {0} to {1}", _
                oldprio.ToString(), priority.ToString())

            ' set the priority
            Thread.CurrentThread.Priority = priority
        End If

        ' push on the stack and pass the call to the next sink
        ' the old priority will be used as "state" for the response
        sinkStack.Push(Me, oldprio)

        Dim spres As ServerProcessing = _next.ProcessMessage(sinkStack, _
            requestMsg, requestHeaders, requestStream, _
            responseMsg, responseHeaders, responseStream)

        'restore priority if call is not asynchronous
        If spres <> ServerProcessing.Async Then
            If (Not lcc Is Nothing) AndAlso _
                (Not lcc.GetData("priority") Is Nothing) Then

                Console.WriteLine("  -> Post-execution change back to {0}", oldprio)
                Thread.CurrentThread.Priority = oldprio
            End If
        End If

        Return spres
    End Function

    Public ReadOnly Property NextChannelSink() As IServerChannelSink _
        Implements IServerChannelSink.NextChannelSink
        Get
            Return _next
        End Get
    End Property
End Class
