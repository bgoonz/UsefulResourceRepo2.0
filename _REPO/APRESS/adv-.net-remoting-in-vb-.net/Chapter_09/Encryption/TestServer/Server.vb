Option Explicit On 
Option Strict On

Imports System.Runtime.Remoting

Module ServerStartup

    Sub Main()
        Dim filename As String
        filename = "testserver.exe.config"
        RemotingConfiguration.Configure(filename)

        Console.WriteLine("Press <return> to exit")
        Console.ReadLine()
    End Sub

End Module
