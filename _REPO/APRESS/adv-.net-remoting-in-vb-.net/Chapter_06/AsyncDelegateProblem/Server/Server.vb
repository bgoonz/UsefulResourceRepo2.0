Option Explicit On 
Option Strict On

Imports System
Imports System.Runtime.Remoting
Imports System.Runtime.Remoting.Channels.Http
Imports System.Runtime.Remoting.Channels
Imports System.Threading

Public Class SomeSAO
    Inherits MarshalByRefObject

    Public Sub DoSomething()
        Console.WriteLine("DoSomething called!")
        ' simulating a long-running query
        Thread.Sleep(5000)
    End Sub
End Class

Module ServerStartup
    Sub Main()

        Dim filename As String = "server.exe.config"
        RemotingConfiguration.Configure(filename)

        Console.WriteLine("Server started, press <return> to exit.")
        ' the server will keep running until keypress.
        Console.ReadLine()
    End Sub
End Module
