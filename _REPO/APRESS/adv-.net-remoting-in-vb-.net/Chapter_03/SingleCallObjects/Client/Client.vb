Option Explicit On 
Option Strict On

Imports System
Imports System.Runtime.Remoting
Imports General
Imports System.Runtime.Remoting.Channels.Http
Imports System.Runtime.Remoting.Channels
Imports Microsoft.VisualBasic

Module Client

    Sub Main()
        Dim channel As New HttpChannel()
        ChannelServices.RegisterChannel(channel)

        Dim obj As IMyRemoteObject = CType(Activator.GetObject( _
            GetType(IMyRemoteObject), _
            "http://localhost:1234/MyRemoteObject.soap"), _
            IMyRemoteObject)

        Console.WriteLine("Client.Main(): Reference to rem.obj. acquired")

        Dim tmp As Integer = obj.getValue()

        Console.WriteLine("Client.Main(): Original server side value: {0}", tmp)
        Console.WriteLine("Client.Main(): Will set value to 42")
        obj.setValue(42)
        tmp = obj.getValue()
        Console.WriteLine("Client.Main(): New server side value {0}", tmp)

        Console.ReadLine()
    End Sub

End Module