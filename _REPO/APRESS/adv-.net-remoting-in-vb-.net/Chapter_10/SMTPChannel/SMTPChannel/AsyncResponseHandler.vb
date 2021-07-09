Option Explicit On 
Option Strict On

Imports System
Imports System.Runtime.Remoting.Channels
Imports System.Runtime.Remoting
Imports System.IO
Imports System.Runtime.Remoting.Messaging

Friend Class AsyncResponseHandler
    Private _sinkStack As IClientChannelSinkStack

    Friend Sub New(ByVal sinkStack As IClientChannelSinkStack)
        _sinkStack = sinkStack
    End Sub

    Friend Sub HandleAsyncResponsePop3Msg(ByVal popmsg As POP3Msg)
        Dim responseHeaders As ITransportHeaders
        Dim responseStream As Stream
        Dim ID As String
        SMTPHelper.ProcessMessage(popmsg, responseHeaders, responseStream, ID)
        _sinkStack.AsyncProcessResponse(responseHeaders, responseStream)
    End Sub
End Class
