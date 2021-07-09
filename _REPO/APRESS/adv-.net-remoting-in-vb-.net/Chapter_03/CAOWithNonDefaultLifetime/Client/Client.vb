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

        Console.WriteLine("Client.Main(): Acquiring object from factory")
        Dim obj1 As IRemoteObject = fact.getNewInstance()

        Console.WriteLine("Client.Main(): Sleeping one second")
        System.Threading.Thread.Sleep(1000)

        Console.WriteLine("Client.Main(): Setting value")
        Try
            obj1.setValue(42)
        Catch e As Exception
            Console.WriteLine("Client.Main(). EXCEPTION " + vbCrLf + e.Message)
        End Try

        Console.ReadLine()
    End Sub

End Module