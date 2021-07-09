Option Explicit On 
Option Strict On

Imports System
Imports System.Runtime.Remoting.Channels
Imports System.Runtime.Remoting.Messaging
Imports System.IO

Public Class UrlAuthenticationSink
    Inherits BaseChannelSinkWithProperties
    Implements IClientChannelSink

    Private _nextSink As IClientChannelSink
    Private _authenticationParamsSet As Boolean

    Public Sub New(ByVal nextSink As IClientChannelSink)
        _nextSink = nextSink
    End Sub

    Public Overrides ReadOnly Property Properties() As IDictionary _
        Implements IChannelSinkBase.Properties
        Get
            Return MyBase.Properties
        End Get
    End Property

    Public ReadOnly Property NextChannelSink() As IClientChannelSink _
    Implements IClientChannelSink.NextChannelSink
        Get
            Return _nextSink
        End Get
    End Property

    Public Sub AsyncProcessRequest( _
        ByVal sinkStack As IClientChannelSinkStack, _
        ByVal msg As IMessage, _
        ByVal headers As ITransportHeaders, _
        ByVal stream As Stream) _
        Implements IClientChannelSink.AsyncProcessRequest

        SetSinkProperties(msg)

        ' don't push on the sinkstack because this sink doesn't need
        ' to handle any replies!
        _nextSink.AsyncProcessRequest(sinkStack, msg, headers, stream)
    End Sub

    Public Sub AsyncProcessResponse( _
        ByVal sinkStack As IClientResponseChannelSinkStack, _
        ByVal state As Object, _
        ByVal headers As ITransportHeaders, _
        ByVal stream As Stream) _
        Implements IClientChannelSink.AsyncProcessResponse

        ' not needed
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

        SetSinkProperties(msg)

        _nextSink.ProcessMessage(msg, requestHeaders, requestStream, _
            responseHeaders, responseStream)
    End Sub

    Private Sub SetSinkProperties(ByVal msg As IMessage)
        If Not _authenticationParamsSet Then
            Dim url As String = CType(msg.Properties("__Uri"), String)

            Dim entr As UrlAuthenticationEntry = _
                UrlAuthenticator.GetAuthenticationEntry(url)

            If Not (entr Is Nothing) Then
                Dim last As IClientChannelSink = Me

                While Not (last.NextChannelSink Is Nothing)
                    last = last.NextChannelSink
                End While

                ' last now contains the transport channel sink 
                last.Properties("username") = entr.Username
                last.Properties("password") = entr.Password
            End If

            _authenticationParamsSet = True
        End If
    End Sub
End Class

