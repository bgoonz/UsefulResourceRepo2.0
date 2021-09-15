Option Explicit On 
Option Strict On

Imports System
Imports System.Runtime.Remoting
Imports System.Runtime.Remoting.Channels.Http
Imports System.Runtime.Remoting.Channels
Imports System.Runtime.Remoting.Proxies
Imports General

Module Client

    Sub Main()
        Dim start As DateTime = System.DateTime.Now

        Dim channel As New HttpChannel()
        ChannelServices.RegisterChannel(channel)

        Dim obj As BaseRemoteObject = CType(Activator.GetObject( _
            GetType(BaseRemoteObject), _
            "http://localhost:1234/MyRemoteObject.soap"), BaseRemoteObject)

        Console.WriteLine("Client.Main(): Reference to rem.obj. acquired")

        Console.WriteLine("Client.Main(): Will set value to 42")
        obj.setValue(42)

        Console.WriteLine("Client.Main(): Will now read value")
        Dim tmp As Integer = obj.getValue()
        Console.WriteLine("Client.Main(): New server side value {0}", tmp)

        Console.WriteLine("Client.Main(): Will call getName()")
        Dim name As String = obj.getName()
        Console.WriteLine("Client.Main(): received name {0}", name)

        Dim finished As DateTime = System.DateTime.Now
        Dim duration As TimeSpan = finished.Subtract(start)
        Console.WriteLine("Client.Main(): Execution took {0} seconds.", duration.Seconds)

        Console.ReadLine()
    End Sub
End Module
