Option Explicit On 
Option Strict On

Imports System
Imports System.Runtime.Remoting
Imports General
Imports System.Runtime.Remoting.Channels.Http
Imports System.Runtime.Remoting.Channels
Imports System.Runtime.Remoting.Proxies

Module Client

    Sub Main()
        Dim channel As New HttpChannel()
        ChannelServices.RegisterChannel(channel)

        Dim obj As BaseRemoteObject = CType(Activator.GetObject( _
            GetType(BaseRemoteObject), _
            "http://localhost:1234/MyRemoteObject.soap"), BaseRemoteObject)

        Console.WriteLine(("Client.Main(): Reference to rem.obj. on " + "Server [1] acquired"))

        Console.WriteLine("Client.Main(): Will set value to 42")
        obj.setValue(42)
        Dim tmp As Integer = obj.getValue()
        Console.WriteLine("Client.Main(): New server side value {0}", tmp)

        Dim workerobj As BaseWorkerObject = CType(Activator.GetObject( _
            GetType(BaseWorkerObject), _
            "http://localhost:1235/MyWorkerObject.soap"), BaseWorkerObject)

        Console.WriteLine(("Client.Main(): Reference to rem. workerobj. on " & _
            "Server [2] acquired"))

        Console.WriteLine("Client.Main(): Will now call method on Srv [2]")
        workerobj.doSomething(obj)

        tmp = obj.getValue()
        Console.WriteLine("Client.Main(): New server side value {0}", tmp)

        Console.ReadLine()
    End Sub
End Module
