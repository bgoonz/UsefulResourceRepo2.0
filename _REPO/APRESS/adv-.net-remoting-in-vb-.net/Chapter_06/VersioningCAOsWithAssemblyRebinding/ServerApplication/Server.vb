Option Explicit On 
Option Strict On

Imports System
Imports System.Runtime.Remoting.Lifetime
Imports System.Runtime.Remoting

Module ServerStartup
    Sub Main()
        RemotingConfiguration.Configure("server.exe.config")
        Console.WriteLine("Press <return> to exit")
        Console.ReadLine()
    End Sub
End Module
