Option Explicit On 
Option Strict On

Imports System.Runtime.Remoting
Imports System.Runtime.Remoting.Channels
Imports System.Runtime.Remoting.Channels.Http
Imports Service

Module Client

    Sub Main()
        ChannelServices.RegisterChannel(New HttpChannel())

        Dim prx As New CustomProxy(GetType(SomeSAO), _
            "http://localhost:1234/SomeSAO.soap")

        Dim obj As SomeSAO = CType(prx.GetTransparentProxy(), SomeSAO)

        Dim res As String = obj.doSomething()

        Console.WriteLine("Got result: {0}", res)
        Console.ReadLine()
    End Sub

End Module
