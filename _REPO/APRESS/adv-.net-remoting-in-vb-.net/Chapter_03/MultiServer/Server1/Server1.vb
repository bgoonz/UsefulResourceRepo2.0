Option Explicit On 
Option Strict On

Imports System
Imports System.Runtime.Remoting
Imports General
Imports System.Runtime.Remoting.Channels.Http
Imports System.Runtime.Remoting.Channels

Class MyRemoteObject
    Inherits BaseRemoteObject
    Private myvalue As Integer

    Public Sub New()
        Console.WriteLine("MyRemoteObject.Constructor: New Object created")
    End Sub

    Public Overrides Sub setValue(ByVal newval As Integer)
        Console.WriteLine("MyRemoteObject.setValue(): old {0} new {1}", _
            myvalue, newval)

        myvalue = newval
    End Sub

    Public Overrides Function getValue() As Integer
        Console.WriteLine("MyRemoteObject.getValue(): current {0}", myvalue)
        Return myvalue
    End Function
End Class


Module ServerStartup

    Sub Main()
        Console.WriteLine("ServerStartup.Main(): Server [1] started")

        Dim chnl As New HttpChannel(1234)
        ChannelServices.RegisterChannel(chnl)
        RemotingConfiguration.RegisterWellKnownServiceType( _
            GetType(MyRemoteObject), _
            "MyRemoteObject.soap", _
            WellKnownObjectMode.Singleton)

        ' the server will keep running until keypress.
        Console.ReadLine()
    End Sub
End Module
