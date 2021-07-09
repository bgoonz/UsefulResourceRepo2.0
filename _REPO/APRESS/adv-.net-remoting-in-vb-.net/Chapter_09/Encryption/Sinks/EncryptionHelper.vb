Option Explicit On 
Option Strict On

Imports System
Imports System.IO
Imports System.Security.Cryptography

Public Module EncryptionHelper

    Public Function ProcessOutboundStream( _
        ByVal inStream As Stream, _
        ByVal algorithm As String, _
        ByVal encryptionkey() As Byte, _
        ByRef encryptionIV() As Byte) As Stream

        Dim outStream As New System.IO.MemoryStream()

        ' setup the encryption properties
        Dim alg As SymmetricAlgorithm = SymmetricAlgorithm.Create(algorithm)
        alg.Key = encryptionkey
        alg.GenerateIV()
        encryptionIV = alg.IV

        Dim encryptStream As New CryptoStream(outStream, _
            alg.CreateEncryptor(), CryptoStreamMode.Write)

        ' write the whole contents through the new streams
        Dim buf() As Byte = New [Byte](1000) {}
        Dim cnt As Integer = inStream.Read(buf, 0, 1000)
        While cnt > 0
            encryptStream.Write(buf, 0, cnt)
            cnt = inStream.Read(buf, 0, 1000)
        End While

        encryptStream.FlushFinalBlock()
        outStream.Seek(0, SeekOrigin.Begin)
        Return outStream
    End Function

    Public Function ProcessInboundStream( _
        ByVal inStream As Stream, _
        ByVal algorithm As String, _
        ByVal encryptionkey() As Byte, _
        ByVal encryptionIV() As Byte) As Stream

        ' setup decryption properties
        Dim alg As SymmetricAlgorithm = SymmetricAlgorithm.Create(algorithm)
        alg.Key = encryptionkey
        alg.IV = encryptionIV

        ' add the decryptor layer to the stream
        Dim outStream As New CryptoStream(inStream, alg.CreateDecryptor(), _
            CryptoStreamMode.Read)

        Return outStream
    End Function
End Module
