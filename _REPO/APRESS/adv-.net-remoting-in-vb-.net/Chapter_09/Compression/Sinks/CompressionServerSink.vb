Option Explicit On 
Option Strict On

Imports System
Imports System.Runtime.Remoting.Channels
Imports System.Runtime.Remoting.Messaging
Imports System.IO



Public Class CompressionServerSink
    Inherits BaseChannelSinkWithProperties
    Implements IServerChannelSink

    Private _nextSink As IServerChannelSink

    Public Overrides ReadOnly Property Properties() As IDictionary _
    Implements IChannelSinkBase.Properties
        Get
            Return MyBase.Properties
        End Get
    End Property

    Public Sub New(ByVal nextSink As IServerChannelSink)
        _nextSink = nextSink
    End Sub

    Public ReadOnly Property NextChannelSink() As IServerChannelSink _
    Implements IServerChannelSink.NextChannelSink
        Get
            Return _nextSink
        End Get
    End Property


    Public Sub AsyncProcessResponse( _
        ByVal sinkStack As IServerResponseChannelSinkStack, _
        ByVal state As Object, _
        ByVal msg As IMessage, _
        ByVal headers As ITransportHeaders, _
        ByVal stream As Stream) _
        Implements IServerChannelSink.AsyncProcessResponse

        ' compressing the response
        stream = CompressionHelper.GetCompressedStreamCopy(stream)

        ' forwarding to the stack for further processing
        sinkStack.AsyncProcessResponse(msg, headers, stream)
    End Sub


    Public Function GetResponseStream( _
        ByVal sinkStack As IServerResponseChannelSinkStack, _
        ByVal state As Object, _
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

    ' uncompressing the request
    requestStream = CompressionHelper.GetUncompressedStreamCopy( _ 
        requestStream)

    ' pushing onto stack and forwarding the call
    sinkStack.Push(Me, Nothing)

    Dim srvProc As ServerProcessing = _nextSink.ProcessMessage(sinkStack, _ 
        requestMsg, requestHeaders, requestStream, responseMsg, _ 
        responseHeaders, responseStream)

    if srvProc = ServerProcessing.Complete then 
        ' compress the response
        responseStream = CompressionHelper.GetCompressedStreamCopy( _ 
            responseStream)
    end if

    ' returning status information
    Return srvProc
End Function
End Class
