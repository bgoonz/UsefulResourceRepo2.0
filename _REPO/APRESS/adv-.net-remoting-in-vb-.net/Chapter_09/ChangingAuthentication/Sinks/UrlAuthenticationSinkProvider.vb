Option Explicit On 
Option Strict On
Imports System
Imports System.Runtime.Remoting.Channels
Imports System.Collections


Public Class UrlAuthenticationSinkProvider
    Implements IClientChannelSinkProvider
    Private _nextProvider As IClientChannelSinkProvider

    Public Sub New(ByVal properties As IDictionary, _
        ByVal providerData As ICollection)

        Dim obj As SinkProviderData
        For Each obj In providerData
            If obj.Name = "url" Then
                If Not (obj.Properties("base") Is Nothing) Then
                    UrlAuthenticator.AddAuthenticationEntry( _
                        CType(obj.Properties("base"), String), _
                        CType(obj.Properties("username"), String), _
                        CType(obj.Properties("password"), String))
                Else
                    UrlAuthenticator.SetDefaultAuthenticationEntry( _
                        CType(obj.Properties("username"), String), _
                        CType(obj.Properties("password"), String))
                End If
            End If
        Next obj
    End Sub

    Public Property [Next]() As IClientChannelSinkProvider _
    Implements IClientChannelSinkProvider.Next
        Get
            Return _nextProvider
        End Get
        Set(ByVal Value As IClientChannelSinkProvider)
            _nextProvider = Value
        End Set
    End Property

    Public Function CreateSink( _
        ByVal channel As IChannelSender, _
        ByVal url As String, _
        ByVal remoteChannelData As Object) As IClientChannelSink _
        Implements IClientChannelSinkProvider.CreateSink

        ' create other sinks in the chain
        Dim nextSink As IClientChannelSink = _
            _nextProvider.CreateSink(channel, url, remoteChannelData)

        ' put our sink on top of the chain and return it				
        Return New UrlAuthenticationSink(nextSink)
    End Function

End Class

