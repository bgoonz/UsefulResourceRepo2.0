Option Explicit On 
Option Strict On

Imports System
Imports System.Runtime.Remoting
Imports System.Runtime.Remoting.Channels.Http
Imports System.Runtime.Remoting.Channels

Class SomeRemoteObject
    Inherits MarshalByRefObject

    Public Sub doSomething()
        Console.WriteLine("SomeRemoteObject.doSomething() called")
    End Sub
End Class

Module ServerStartup
    Sub Main()
        Console.WriteLine("ServerStartup.Main(): Server started")

        Dim chnl As New HttpChannel(1234)
        ChannelServices.RegisterChannel(chnl)

        RemotingConfiguration.RegisterWellKnownServiceType( _
            GetType(SomeRemoteObject), _
            "SomeRemoteObject.soap", _
            WellKnownObjectMode.SingleCall)

        ' the server will keep running until keypress.
        Console.ReadLine()
    End Sub
End Module
