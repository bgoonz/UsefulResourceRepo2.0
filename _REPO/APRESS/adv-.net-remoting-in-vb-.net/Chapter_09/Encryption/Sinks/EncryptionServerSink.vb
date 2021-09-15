Option Explicit On 
Option Strict On

Imports System
Imports System.Runtime.Remoting.Channels
Imports System.Runtime.Remoting
Imports System.Runtime.Remoting.Messaging
Imports System.IO


Public Class EncryptionServerSink
    Inherits BaseChannelSinkWithProperties
    Implements IServerChannelSink

    Private _nextSink As IServerChannelSink
    Private _encryptionKey() As Byte
    Private _encryptionAlgorithm As String

    Public Overrides ReadOnly Property Properties() As IDictionary _
    Implements IChannelSinkBase.Properties
        Get
            Return MyBase.Properties
        End Get
    End Property

    Public Sub New(ByVal nextSink As IServerChannelSink, _
        ByVal encryptionKey() As Byte, _
        ByVal encryptionAlgorithm As String)

        _encryptionKey = encryptionKey
        _encryptionAlgorithm = encryptionAlgorithm
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
        Dim isEncrypted As Boolean = CBool(state)

        If isEncrypted Then
            ' encrypting the response if necessary
            Dim IV() As Byte

            stream = EncryptionHelper.ProcessOutboundStream( _
                stream, _encryptionAlgorithm, _encryptionKey, IV)

            headers("X-Encrypt") = "yes"
            headers("X-EncryptIV") = Convert.ToBase64String(IV)
        End If

        ' forwarding to the stack for further ProcessIng
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

        Dim isEncrypted As Boolean = False

        'checking the headers
        If (Not requestHeaders("X-Encrypt") Is Nothing) AndAlso _
            requestHeaders("X-Encrypt").Equals("yes") Then

            isEncrypted = True

            Dim IV As Byte() = Convert.FromBase64String( _
                CType(requestHeaders("X-EncryptIV"), String))

            ' decrypt the request
            requestStream = EncryptionHelper.ProcessInboundStream( _
                requestStream, _encryptionAlgorithm, _encryptionKey, IV)
        End If


        ' pushing onto stack and forwarding the call,
        ' the flag "isEncrypted" will be used as state
        sinkStack.Push(Me, isEncrypted)

        Dim srvProc As ServerProcessing = _nextSink.ProcessMessage( _
            sinkStack, requestMsg, requestHeaders, requestStream, _
            responseMsg, responseHeaders, responseStream)

        If isEncrypted Then
            ' encrypting the response if necessary
            Dim IV() As Byte

            responseStream = EncryptionHelper.ProcessOutboundStream( _
                responseStream, _encryptionAlgorithm, _encryptionKey, IV)

            responseHeaders("X-Encrypt") = "yes"
            responseHeaders("X-EncryptIV") = Convert.ToBase64String(IV)
        End If

        ' returning status information
        Return srvProc
    End Function
End Class
