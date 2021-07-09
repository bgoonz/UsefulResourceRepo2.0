Option Explicit On 
Option Strict On

Imports System
Imports System.Runtime.Remoting.Lifetime
Imports System.Runtime.Remoting

Public Class SomeCAO
    Inherits ExtendedMBRObject

    Public Sub New()
        Console.WriteLine("SomeCAO.CTOR called")
    End Sub

    Public Sub doSomething()
        Console.WriteLine("SomeCAO.doSomething called")
    End Sub
End Class


Module ServerStartup
    Sub Main()
        RemotingConfiguration.Configure("server.exe.config")
        Console.WriteLine("Press <return> to exit")
        Console.ReadLine()
    End Sub
End Module
