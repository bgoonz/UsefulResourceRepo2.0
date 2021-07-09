Option Explicit On 
Option Strict On

Imports System
Imports System.Runtime.Remoting
Imports General
Imports System.Runtime.Remoting.Channels.Http
Imports System.Runtime.Remoting.Channels

Module Client

    Dim WithEvents wrapper As BroadcastEventWrapper

    Sub Main()
        Dim filename As String = "eventlistener.exe.config"
        RemotingConfiguration.Configure(filename)


        Dim bcaster As IBroadCaster = CType(RemotingHelper.GetObject( _
            GetType(IBroadCaster)), IBroadCaster)

        wrapper = New BroadcastEventWrapper(bcaster)

        Console.WriteLine("Waiting for message ...")
        Console.ReadLine()
    End Sub

    Public Sub wrapper_MessageArrivedLocally(ByVal msg As String) _
    Handles wrapper.MessageArrivedLocally
        Console.WriteLine("Message: " & msg)
    End Sub

End Module