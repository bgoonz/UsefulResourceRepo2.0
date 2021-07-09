Option Explicit On 
Option Strict On

Imports System
Imports System.Runtime.Remoting
Imports System.Runtime.Remoting.Channels
Imports System.Runtime.Remoting.Contexts
Imports System.Runtime.Remoting.Messaging

Module ServerStartup

    Sub Main()
        RemotingConfiguration.Configure("testserver2.exe.config")

        Console.WriteLine("Press <return> to exit")
        Console.ReadLine()
    End Sub
End Module
