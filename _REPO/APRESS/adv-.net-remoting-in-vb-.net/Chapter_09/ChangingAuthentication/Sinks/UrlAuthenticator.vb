Option Explicit On 
Option Strict On

Imports System
Imports System.Collections

Friend Class UrlAuthenticationEntry
    Friend Username As String
    Friend Password As String
    Friend UrlBase As String

    Friend Sub New(ByVal urlbase As String, _
    ByVal user As String, _
    ByVal password As String)

        Me.Username = user
        Me.Password = password
        Me.UrlBase = urlbase.ToUpper()
    End Sub
End Class

Public Class UrlAuthenticator
    Private Shared _entries As New ArrayList()
    Private Shared _defaultAuthenticationEntry As UrlAuthenticationEntry

    Public Shared Sub AddAuthenticationEntry( _
        ByVal urlBase As String, _
        ByVal userName As String, _
        ByVal password As String)

        _entries.Add(New UrlAuthenticationEntry(urlBase, userName, password))
    End Sub


    Public Shared Sub SetDefaultAuthenticationEntry( _
        ByVal userName As String, _
        ByVal password As String)

        _defaultAuthenticationEntry = New UrlAuthenticationEntry( _ 
            Nothing, userName, password)
    End Sub

    Friend Shared Function GetAuthenticationEntry( _
        ByVal url As String) As UrlAuthenticationEntry

        Dim entr As UrlAuthenticationEntry
        For Each entr In _entries
            ' check if a registered entry matches the url-parameter
            If url.ToUpper().StartsWith(entr.UrlBase) Then
                Return entr
            End If
        Next entr

        ' if none matched, return the default entry (which can be null as well)
        Return _defaultAuthenticationEntry
    End Function
End Class

