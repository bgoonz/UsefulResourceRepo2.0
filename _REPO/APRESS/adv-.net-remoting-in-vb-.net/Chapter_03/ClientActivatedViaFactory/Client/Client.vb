Option Explicit On 
Option Strict On

Imports System
Imports System.Runtime.Remoting
Imports General
Imports System.Runtime.Remoting.Channels.Http
Imports System.Runtime.Remoting.Channels

Module Client

    Sub Main()
        Dim channel As New HttpChannel()
        ChannelServices.RegisterChannel(channel)

        Console.WriteLine("Client.Main(): Creating factory")
        Dim fact As IRemoteFactory = CType(Activator.GetObject( _
            GetType(IRemoteFactory), _
            "http://localhost:1234/factory.soap"), _
            IRemoteFactory)

        Console.WriteLine("Client.Main(): Acquiring first object from factory")
        Dim obj1 As IRemoteObject = fact.getNewInstance()
        obj1.setValue(42)

        Console.WriteLine("Client.Main(): Acquiring second object from factory")
        Dim obj2 As IRemoteObject = fact.getNewInstance(4711)

        Console.WriteLine("Obj1.getValue(): {0}", obj1.getValue())
        Console.WriteLine("Obj2.getValue(): {0}", obj2.getValue())

        Console.ReadLine()
    End Sub

End Module