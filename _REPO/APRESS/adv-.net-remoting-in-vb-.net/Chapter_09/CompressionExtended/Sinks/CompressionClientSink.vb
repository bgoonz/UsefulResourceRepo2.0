Option Explicit On 
Option Strict On

Imports System
Imports System.Runtime.Remoting.Channels
Imports System.Runtime.Remoting.Messaging
Imports System.IO

Public Class CompressionClientSink
    Inherits BaseChannelSinkWithProperties
    Implements IClientChannelSink
    Private _nextSink As IClientChannelSink

    Public Sub New(ByVal nextSink As IClientChannelSink)
        _nextSink = nextSink
    End Sub

    Public ReadOnly Property NextChannelSink() As IClientChannelSink _
        Implements IClientChannelSink.NextChannelSink

        Get
            Return _nextSink
        End Get
    End Property

    Public Overrides ReadOnly Property Properties() As IDictionary _
    Implements IClientChannelSink.Properties
        Get
            Return MyBase.Properties
        End Get
    End Property

    Public Sub AsyncProcessRequest( _
        ByVal sinkStack As IClientChannelSinkStack, _
        ByVal msg As IMessage, _
        ByVal headers As ITransportHeaders, _
        ByVal stream As Stream) _
        Implements IClientChannelSink.AsyncProcessRequest

        headers("X-Compress") = "yes"
        stream = CompressionHelper.GetCompressedStreamCopy(stream)

        ' push onto stack and forward the request
        sinkStack.Push(Me, Nothing)
        _nextSink.AsyncProcessRequest(sinkStack, msg, headers, stream)
    End Sub


    Public Sub AsyncProcessResponse( _
        ByVal sinkStack As IClientResponseChannelSinkStack, _
        ByVal state As Object, _
        ByVal headers As ITransportHeaders, _
        ByVal stream As Stream) _
        Implements IClientChannelSink.AsyncProcessResponse

        ' deflate the response if necessary
        Dim xcompress As String = CType(headers("X-Compress"), String)

        If (Not xcompress Is Nothing) AndAlso (xcompress = "yes") Then
            stream = _
                CompressionHelper.GetUncompressedStreamCopy(stream)
        End If

        ' forward the request
        sinkStack.AsyncProcessResponse(headers, stream)
    End Sub

    Public Function GetRequestStream( _
        ByVal msg As IMessage, _
        ByVal headers As ITransportHeaders) As Stream _
        Implements IClientChannelSink.GetRequestStream

        Return _nextSink.GetRequestStream(msg, headers)
    End Function

    Public Sub ProcessMessage( _
        ByVal msg As IMessage, _
        ByVal requestHeaders As ITransportHeaders, _
        ByVal requestStream As Stream, _
        ByRef responseHeaders As ITransportHeaders, _
        ByRef responseStream As Stream) _
        Implements IClientChannelSink.ProcessMessage

        requestStream = CompressionHelper.GetCompressedStreamCopy(requestStream)
        requestHeaders("X-Compress") = "yes"

        ' forward the call to the next sink
        _nextSink.ProcessMessage(msg, requestHeaders, _
            requestStream, responseHeaders, responseStream)

        ' deflate the response if necessary
        Dim xcompress As String = CType(responseHeaders("X-Compress"), String)

        If (Not xcompress Is Nothing) AndAlso (xcompress = "yes") Then
            responseStream = _
                CompressionHelper.GetUncompressedStreamCopy(responseStream)
        End If

    End Sub
End Class
