Option Explicit On 
Option Strict On

Imports System
Imports System.Runtime.Remoting
Imports VersionedSAO ' from generated_meta_xxx.dll

Module Client
    Sub Main()
        Dim filename As String = "client.exe.config"
        RemotingConfiguration.Configure(filename)

        Dim obj As New SomeSAO()
        Dim result As String = obj.getSAOVersion()
        Console.WriteLine("Result: {0}", result)

        Console.WriteLine("Finished ... press <return> to exit")
        Console.ReadLine()
    End Sub
End Module
