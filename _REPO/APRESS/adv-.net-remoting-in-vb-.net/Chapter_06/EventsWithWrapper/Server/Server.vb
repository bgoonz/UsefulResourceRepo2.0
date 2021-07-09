Option Explicit On 
Option Strict On

Imports System
Imports System.Runtime.Remoting
Imports General

Class Broadcaster
    Inherits MarshalByRefObject
    Implements IBroadcaster

    Public Event MessageArrived As MessageArrivedHandler _
        Implements IBroadcaster.MessageArrived

    Public Sub BroadcastMessage(ByVal msg As String) _
    Implements IBroadcaster.BroadcastMessage
        Console.WriteLine("Will broadcast message: {0}", msg)
        RaiseEvent MessageArrived(msg)
    End Sub

    Public Overrides Function InitializeLifetimeService() As Object
        ' this object has to live "forever"
        Return Nothing
    End Function
End Class

Module ServerStartup


    Sub Main()
        Dim filename As String = "server.exe.config"
        RemotingConfiguration.Configure(filename)

        ' the server will keep running until keypress.
        Console.WriteLine("Server started, press <return> to exit.")
        Console.ReadLine()
    End Sub
End Module


