Option Explicit On 
Option Strict On

Imports System
Imports System.Runtime.Remoting.Channels
Imports System.Runtime.Remoting
Imports System.Runtime.Remoting.Messaging
Imports System.IO

Public Class SMTPClientTransportSink
    Inherits BaseChannelSinkWithProperties
    Implements IClientChannelSink, IChannelSinkBase
    Private _destinationEmailAddress As String
    Private _senderEmailAddress As String
    Private _objectURI As String
    Private _smtpServer As String

    Public Sub New( _
        ByVal destinationEmailAddress As String, _
        ByVal senderEmailAddress As String, _
        ByVal smtpServer As String, _
        ByVal objectURI As String)

        _destinationEmailAddress = destinationEmailAddress
        _senderEmailAddress = senderEmailAddress
        _objectURI = objectURI
        _smtpServer = smtpServer
    End Sub

    Public Sub ProcessMessage( _
        ByVal msg As IMessage, _
        ByVal requestHeaders As ITransportHeaders, _
        ByVal requestStream As Stream, _
        ByRef responseHeaders As ITransportHeaders, _
        ByRef responseStream As Stream) _
        Implements IClientChannelSink.ProcessMessage

        Dim ID As String
        Dim objectURI As String
        Dim email As String

        ' check the URL
        Dim URL As String = CType(msg.Properties("__Uri"), String)
        SMTPHelper.parseURL(URL, email, objectURI)
        If email Is Nothing OrElse email = "" Then
            email = _destinationEmailAddress
        End If

        ' send the message
        SMTPHelper.SendRequestMessage(_senderEmailAddress, email, _
                _smtpServer, requestHeaders, requestStream, objectURI, ID)
        ' wait for the response
        Dim popmsg As POP3Msg = SMTPHelper.WaitAndGetResponseMessage(ID)
        ' process the response
        SMTPHelper.ProcessMessage(popmsg, responseHeaders, responseStream, ID)
    End Sub

    Public Sub AsyncProcessRequest( _
        ByVal sinkStack As IClientChannelSinkStack, _
        ByVal msg As IMessage, _
        ByVal headers As ITransportHeaders, _
        ByVal stream As Stream) _
        Implements IClientChannelSink.AsyncProcessRequest

        Dim ID As String
        Dim objectURI As String
        Dim email As String

        ' parse the url
        Dim URL As String = CType(msg.Properties("__Uri"), String)
        SMTPHelper.parseURL(URL, email, objectURI)
        If email Is Nothing OrElse email = "" Then
            email = _destinationEmailAddress
        End If

        ' send the request message
        SMTPHelper.SendRequestMessage(_senderEmailAddress, email, _
            _smtpServer, headers, stream, objectURI, ID)

        ' create and register an async response handler
        Dim ar As New AsyncResponseHandler(sinkStack)
        SMTPHelper.RegisterAsyncResponseHandler(ID, ar)
    End Sub

    Public Sub AsyncProcessResponse( _
        ByVal sinkStack As IClientResponseChannelSinkStack, _
        ByVal state As Object, _
        ByVal headers As ITransportHeaders, _
        ByVal stream As System.IO.Stream) _
        Implements IClientChannelSink.AsyncProcessResponse

        ' not needed in a transport sink!
        Throw New NotSupportedException()
    End Sub

    Public Function GetRequestStream(ByVal msg As IMessage, _
        ByVal headers As ITransportHeaders) As Stream _
        Implements IClientChannelSink.GetRequestStream

        ' no direct way to access the stream
        Return Nothing
    End Function

    Public ReadOnly Property NextChannelSink() As IClientChannelSink _
    Implements IClientChannelSink.NextChannelSink

        Get
            ' no more sinks
            Return Nothing
        End Get
    End Property

    Public Overrides ReadOnly Property Properties() As IDictionary _
    Implements IChannelSinkBase.Properties
        Get
            Return MyBase.Properties
        End Get
    End Property
End Class
