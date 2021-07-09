Option Explicit On 
Option Strict On

Imports System
Imports System.Runtime.Remoting.Channels
Imports System.Runtime.Remoting.Messaging
Imports System.IO
Imports System.Text

Public Class EncryptionClientSink
    Inherits BaseChannelSinkWithProperties
    Implements IClientChannelSink

    Private _nextSink As IClientChannelSink
    Private _encryptionKey() As Byte
    Private _encryptionAlgorithm As String

    Public Sub New(ByVal nextSink As IClientChannelSink, _
        ByVal encryptionKey() As Byte, _
        ByVal encryptionAlgorithm As String)

        _nextSink = nextSink
        _encryptionKey = encryptionKey
        _encryptionAlgorithm = encryptionAlgorithm
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

        Dim IV() As Byte

        stream = EncryptionHelper.ProcessOutboundStream(stream, _
            _encryptionAlgorithm, _encryptionKey, IV)

        headers("X-Encrypt") = "yes"
        headers("X-EncryptIV") = Convert.ToBase64String(IV)

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


        If (Not headers("X-Encrypt") Is Nothing) AndAlso _
            headers("X-Encrypt").Equals("yes") Then

            Dim IV As Byte() = Convert.FromBase64String( _
                CType(headers("X-EncryptIV"), String))

            stream = EncryptionHelper.ProcessInboundStream(stream, _
                _encryptionAlgorithm, _encryptionKey, IV)
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

        Dim IV() As Byte

        requestStream = EncryptionHelper.ProcessOutboundStream( _
            requestStream, _encryptionAlgorithm, _encryptionKey, IV)

        requestHeaders("X-Encrypt") = "yes"
        requestHeaders("X-EncryptIV") = Convert.ToBase64String(IV)

        ' forward the call to the next sink
        _nextSink.ProcessMessage(msg, requestHeaders, requestStream, _
            responseHeaders, responseStream)

        If (Not responseHeaders("X-Encrypt") Is Nothing) AndAlso _
            responseHeaders("X-Encrypt").Equals("yes") Then

            IV = Convert.FromBase64String( _
                CType(responseHeaders("X-EncryptIV"), String))

            responseStream = EncryptionHelper.ProcessInboundStream( _
                responseStream, _encryptionAlgorithm, _encryptionKey, IV)
        End If
    End Sub
End Class
