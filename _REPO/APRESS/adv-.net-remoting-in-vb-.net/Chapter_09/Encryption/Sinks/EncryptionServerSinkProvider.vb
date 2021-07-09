Option Explicit On 
Option Strict On

Imports System
Imports System.IO
Imports System.Runtime.Remoting.Channels
Imports System.Runtime.Remoting
Imports System.Collections

Public Class EncryptionServerSinkProvider
    Implements IServerChannelSinkProvider

    Private _encryptionKey As Byte()
    Private _encryptionAlgorithm As String
    Private _nextProvider As IServerChannelSinkProvider

    Public Sub New(ByVal properties As IDictionary, _
        ByVal providerData As ICollection)

        _encryptionAlgorithm = CType(properties("algorithm"), String)
        Dim keyfile As String = CType(properties("keyfile"), String)

        If _encryptionAlgorithm Is Nothing Or keyfile Is Nothing Then
            Throw New RemotingException("'algorithm' and 'keyfile' have to " & _
                "be specified for EncryptionServerSinkProvider")
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


    Public Property [Next]() As IServerChannelSinkProvider _
        Implements IServerChannelSinkProvider.Next
        Get
            Return _nextProvider
        End Get
        Set(ByVal Value As IServerChannelSinkProvider)
            _nextProvider = Value
        End Set
    End Property

    Public Function CreateSink( _
        ByVal channel As IChannelReceiver) As IServerChannelSink _
        Implements IServerChannelSinkProvider.CreateSink

        ' create other sinks in the chain
        Dim nextSink As IServerChannelSink = _
            _nextProvider.CreateSink(channel)

        ' put our sink on top of the chain and return it				
        Return New EncryptionServerSink(nextSink, _
            _encryptionKey, _encryptionAlgorithm)
    End Function

    Public Sub GetChannelData(ByVal channelData As IChannelDataStore) _
    Implements IServerChannelSinkProvider.GetChannelData
        ' not needed
    End Sub
End Class

