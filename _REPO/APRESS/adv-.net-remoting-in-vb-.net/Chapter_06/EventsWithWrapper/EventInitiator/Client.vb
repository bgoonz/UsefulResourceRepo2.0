Imports System
Imports System.Runtime.Remoting
Imports General
Imports System.Runtime.Remoting.Channels.Http
Imports System.Runtime.Remoting.Channels

Module Client

    Sub Main()
        Dim filename As String = "eventinitiator.exe.config"
        RemotingConfiguration.Configure(filename)


        Dim bcaster As IBroadcaster = CType(RemotingHelper.GetObject( _
            GetType(IBroadcaster)), IBroadcaster)
        bcaster.BroadcastMessage("Hello World")


        Console.WriteLine("Message sent.")
        Console.ReadLine()
    End Sub

End Module