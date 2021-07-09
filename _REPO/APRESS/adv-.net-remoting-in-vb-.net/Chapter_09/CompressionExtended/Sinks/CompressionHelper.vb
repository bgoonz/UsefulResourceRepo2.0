Option Explicit On 
Option Strict On

Imports System
Imports System.IO
Imports NZlib.Compression
Imports NZlib.Streams

Public Class CompressionHelper

    Public Shared Function GetCompressedStreamCopy( _
        ByVal inStream As Stream) As Stream

        Dim outStream As New System.IO.MemoryStream()
        Dim compressStream As New DeflaterOutputStream( _
            outStream, New Deflater(Deflater.BEST_COMPRESSION))

        Dim buf() As Byte = New [Byte](1000) {}
        Dim cnt As Integer = inStream.Read(buf, 0, 1000)
        While cnt > 0
            compressStream.Write(buf, 0, cnt)
            cnt = inStream.Read(buf, 0, 1000)
        End While
        compressStream.Finish()
        compressStream.Flush()
        Return outStream
    End Function

    Public Shared Function GetUncompressedStreamCopy( _
        ByVal inStream As Stream) As Stream

        Return New InflaterInputStream(inStream)
    End Function
End Class

