Option Explicit On 
Option Strict On

Imports System
Imports System.IO
Imports System.Runtime.Remoting.Channels
Imports System.Runtime.Remoting
Imports System.Runtime.Remoting.Messaging

Public Class SMTPServerTransportSink
    Implements IServerChannelSink

    ' will be used as a state object for the async reply
    Private Class SMTPState
        Friend ID As String
        Friend responseAddress As String
    End Class 'SMTPState

    Private _smtpServer As String
    Private _myAddress As String
    Private _nextSink As IServerChannelSink

    Public Sub New( _ 
        ByVal nextSink As IServerChannelSink, _
        ByVal smtpServer As String, _
        ByVal myAddress As String)

        _nextSink = nextSink
        _smtpServer = smtpServer
        _myAddress = myAddress
    End Sub

    Public Sub HandleIncomingMessage(ByVal popmsg As POP3Msg)
        Dim requestStream As Stream
        Dim requestHeaders As ITransportHeaders
        Dim ID As String

        ' split the message in Stream and ITransportHeaders
        SMTPHelper.ProcessMessage(popmsg, requestHeaders, requestStream, ID)

        'Console.WriteLine("-- URL: {0}",requestHeaders["__RequestUri"]);
        'Console.WriteLine("-- SoapAction: {0}",requestHeaders["SOAPAction"]);
        ' create a new sink stack
        Dim stack As New ServerChannelSinkStack()

        ' create a new state object and populate it 
        Dim state As New SMTPState()
        state.ID = ID
        state.responseAddress = SMTPHelper.GetCleanAddress(popmsg.MsgFrom)

        ' push this sink onto the stack
        stack.Push(Me, state)

        Dim responseMsg As IMessage
        Dim responseStream As Stream
        Dim responseHeaders As ITransportHeaders

        ' forward the call to the next sink
        Dim proc As ServerProcessing = _nextSink.ProcessMessage(stack, _ 
            Nothing, requestHeaders, requestStream, responseMsg, _ 
            responseHeaders, responseStream)

        ' check the return value. 
        Select Case proc
            ' this message has been handled synchronously
        Case ServerProcessing.Complete
                ' send a response message
                SMTPHelper.SendResponseMessage(_myAddress, _ 
                state.responseAddress, _smtpServer, responseHeaders, _ 
                responseStream, state.ID)

                ' this message has been handled asynchronously
            Case ServerProcessing.Async
                ' nothing needs to be done yet 

                ' it's been a one way message
            Case ServerProcessing.OneWay
        End Select ' nothing needs to be done yet 
    End Sub

    Public Sub AsyncProcessResponse( _ 
        ByVal sinkStack As IServerResponseChannelSinkStack, _
        ByVal state As Object, _
        ByVal msg As IMessage, _
        ByVal headers As ITransportHeaders, _
        ByVal stream As System.IO.Stream) _
        Implements IServerChannelSink.AsyncProcessResponse

        ' fetch the state object
        Dim smtpstate As SMTPState = CType(state, SMTPState)

        ' send the response email
        SMTPHelper.SendResponseMessage(_myAddress, smtpstate.responseAddress, _ 
            _smtpServer, headers, stream, smtpstate.ID)
    End Sub

    Public ReadOnly Property NextChannelSink() As IServerChannelSink _
    Implements IServerChannelSink.NextChannelSink
        Get
            Return _nextSink
        End Get
    End Property

    Public ReadOnly Property Properties() As System.Collections.IDictionary _
    Implements IServerChannelSink.Properties
        Get
            ' not needed
            Return Nothing
        End Get
    End Property

    Public Function ProcessMessage( _ 
        ByVal sinkStack As IServerChannelSinkStack, _ 
        ByVal requestMsg As IMessage, _ 
        ByVal requestHeaders As ITransportHeaders, _
        ByVal requestStream As Stream, _
        ByRef responseMsg As IMessage, _
        ByRef responseHeaders As ITransportHeaders, _
        ByRef responseStream As Stream) As ServerProcessing _
        Implements IServerChannelSink.ProcessMessage

        ' will never be called for a server side transport sink
        Throw New NotSupportedException()
    End Function

    Public Function GetResponseStream( _ 
        ByVal sinkStack As IServerResponseChannelSinkStack, _ 
        ByVal state As Object, _ 
        ByVal msg As IMessage, _ 
        ByVal headers As ITransportHeaders) As Stream _
        Implements IServerChannelSink.GetResponseStream

        ' it's not possible to directly access the stream 
        Return Nothing
    End Function 
End Class
