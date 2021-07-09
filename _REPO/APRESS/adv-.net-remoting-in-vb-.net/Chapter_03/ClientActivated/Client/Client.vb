Option Explicit On 
Option Strict On

Imports System
Imports System.Runtime.Remoting
Imports System.Runtime.Remoting.Channels.Http
Imports System.Runtime.Remoting.Channels

Module Client

    Sub Main()
        Dim channel As New HttpChannel()
        ChannelServices.RegisterChannel(channel)

        RemotingConfiguration.RegisterActivatedClientType( _
            GetType(Server.MyRemoteObject), "http://localhost:1234/MyServer")

        Console.WriteLine("Client.Main(): Creating first object")

        Dim obj1 As New Server.MyRemoteObject()

        obj1.setValue(42)

        Console.WriteLine("Client.Main(): Creating second object")
        Dim obj2 As New Server.MyRemoteObject()
        obj2.setValue(4711)

        Console.WriteLine("Obj1.getValue(): {0}", obj1.getValue())
        Console.WriteLine("Obj2.getValue(): {0}", obj2.getValue())

        Console.ReadLine()


    End Sub

End Module