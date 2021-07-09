Option Explicit On 
Option Strict On

Imports System
Imports System.Runtime.Remoting
Imports System.Runtime.Remoting.Channels.Http
Imports System.Runtime.Remoting.Channels
Imports System.Collections
Imports System.Threading
Imports General

Class MyRemoteObject
    Inherits BaseRemoteObject
    Private myvalue As Integer

    Public Sub New()
        Console.WriteLine("MyRemoteObject.Constructor: New Object created")
    End Sub

    Public Overrides Sub setValue(ByVal newval As Integer)
        Console.WriteLine("MyRemoteObject.setValue(): old {0} new {1}", _
            myvalue, newval)

        ' we simulate a long running action 
        Console.WriteLine("  .setValue() -> waiting 5 sec before setting value")
        Thread.Sleep(5000)

        myvalue = newval
        Console.WriteLine("  .setValue() -> value is now set")
    End Sub


    Public Overrides Function getValue() As Integer
        Console.WriteLine("MyRemoteObject.getValue(): current {0}", myvalue)
        Return myvalue
    End Function


    Public Overrides Function getName() As String
        Console.WriteLine("MyRemoteObject.getName(): called")

        ' we simulate a long running action 
        Console.WriteLine("  .getName() -> waiting 5 sec before continuing")
        Thread.Sleep(5000)

        Console.WriteLine("  .getName() -> returning name")
        Return "John Doe"
    End Function
End Class

Module ServerStartup

    Sub Main()
        Console.WriteLine("ServerStartup.Main(): Server started")

        Dim chnl As New HttpChannel(1234)
        ChannelServices.RegisterChannel(chnl)

        RemotingConfiguration.RegisterWellKnownServiceType( _
            GetType(MyRemoteObject), "MyRemoteObject.soap", _
            WellKnownObjectMode.Singleton)

        ' the server will keep running until keypress.
        Console.ReadLine()
    End Sub 'Main
End Module
