Option Explicit On 
Option Strict On

Imports System
Imports System.IO
Imports System.Runtime.Remoting.Channels
Imports System.Runtime.Remoting
Imports System.Collections


Public Class EncryptionClientSinkProvider
    Implements IClientChannelSinkProvider
    Private _nextProvider As IClientChannelSinkProvider
    Private _encryptionKey() As Byte
    Private _encryptionAlgorithm As String

    Public Sub New(ByVal properties As IDictionary, _
        ByVal providerData As ICollection)

        _encryptionAlgorithm = CType(properties("algorithm"), String)
        Dim keyfile As String = CType(properties("keyfile"), String)

        If _encryptionAlgorithm Is Nothing Or keyfile Is Nothing Then
            Throw New RemotingException("'algorithm' and 'keyfile' have to " & _
                "be specified for EncryptionClientSinkProvider")
        End If

        ' read the encryption key from the specified fike
        Dim fi As New FileInfo(keyfile)

        If Not fi.Exists Then
            Throw New RemotingException("Specified keyfile does not exist")
        End If

        Dim fs As New FileStream(keyfile, FileMode.Open)
        ReDim _encryptionKey(CType(fi.Length, Integer) - 1)
        fs.Read(_encryptionKey, 0, _encryptionKey.Length)

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

        Dim nextSink As IClientChannelSink = _
            _nextProvider.CreateSink(channel, url, remoteChannelData)

        Return New EncryptionClientSink(nextSink, _
            _encryptionKey, _encryptionAlgorithm)
    End Function

End Class

