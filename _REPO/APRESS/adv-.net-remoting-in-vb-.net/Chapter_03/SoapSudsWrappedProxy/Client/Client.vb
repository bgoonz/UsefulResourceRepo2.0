Option Explicit On 
Option Strict On

Imports System
Imports System.Runtime.Remoting
Imports System.Runtime.Remoting.Channels.Http
Imports System.Runtime.Remoting.Channels
Imports Server

Module Client

    Sub Main()
        Console.WriteLine("Client.Main(): creating rem. reference")
        Dim obj As New SomeRemoteObject()
        Console.WriteLine("Client.Main(): calling doSomething()")
        obj.doSomething()
        Console.WriteLine("Client.Main(): done ")

        Console.ReadLine()
    End Sub
End Module
