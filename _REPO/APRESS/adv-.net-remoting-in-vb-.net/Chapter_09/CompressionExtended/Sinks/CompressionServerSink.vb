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

        ' fetching the flag from the async-state
        Dim hasBeenCompressed As Boolean = CType(state, Boolean)

        ' compressing the response if necessary
        If hasBeenCompressed Then
            stream = CompressionHelper.GetCompressedStreamCopy(stream)
            headers("X-Compress") = "yes"
        End If

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

        Dim isCompressed As Boolean = False

        ' uncompressing the request if necesary
        Dim xcompress As String = CType(requestHeaders("X-Compress"), String)
        If (Not xcompress Is Nothing) AndAlso (xcompress = "yes") Then
            requestStream  = _
                CompressionHelper.GetUncompressedStreamCopy(requestStream)
            isCompressed = True
        End If


        ' Pushing onto stack and forwarding the call
        ' The state object contains true if the request has been compressed,
        ' else false
        sinkStack.Push(Me, isCompressed)

        Dim srvProc As ServerProcessing = _nextSink.ProcessMessage(sinkStack, _
            requestMsg, requestHeaders, requestStream, responseMsg, _
            responseHeaders, responseStream)

        If srvProc = ServerProcessing.Complete Then
            ' compressing the response if necessary
            If isCompressed Then
                responseStream = _
                    CompressionHelper.GetCompressedStreamCopy(responseStream)
                responseHeaders("X-Compress") = "yes"
            End If
        End If

        ' returning status information
        Return srvProc
    End Function
End Class
