Option Explicit On 
Option Strict On

Imports System.Runtime.Remoting
Imports Service

Module Client

    Sub Main()
        Dim filename As String
        filename = "testclient.exe.config"

        RemotingConfiguration.Configure(filename)

        Dim sao As New SomeSAO()
        Dim res As String = sao.DoSomething()

        Console.WriteLine("Got result: {0}", res)
        Console.ReadLine()
    End Sub

End Module
