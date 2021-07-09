Option Explicit On 
Option Strict On

Imports System
Imports System.Runtime.Remoting
Imports Server ' from generated_meta_xxx.dll

Module Client
    Sub Main()
        Dim filename As String = "client.exe.config"
        RemotingConfiguration.Configure(filename)

        Dim obj As New SomeCAO()
        obj.doSomething()

        Console.WriteLine("Finished ... press <return> to exit")
        Console.ReadLine()
    End Sub
End Module
