Option Explicit On 
Option Strict On

Imports System
Imports System.Runtime.Remoting
Imports System.Runtime.Remoting.Channels.Http
Imports System.Runtime.Remoting.Channels


Public Class MyRemoteObject
    Inherits MarshalByRefObject

    Private myvalue As Integer

    Public Sub New()
        Console.WriteLine("MyRemoteObject.Constructor: New Object created")
    End Sub 'New

    Public Sub New(ByVal startvalue As Integer)
        Console.WriteLine("MyRemoteObject.Constructor: .ctor called with {0}", _
            startvalue)
        myvalue = startvalue
    End Sub

    Public Sub setValue(ByVal newval As Integer)
        Console.WriteLine("MyRemoteObject.setValue(): old {0} new {1}", _
            myvalue, newval)
        myvalue = newval
    End Sub

    Public Function getValue() As Integer
        Console.WriteLine("MyRemoteObject.getValue(): current {0}", _
            myvalue)
        Return myvalue
    End Function

End Class

Module ServerStartup

    Sub Main()
        Console.WriteLine("ServerStartup.Main(): Server started")

        Dim chnl As New HttpChannel(1234)
        ChannelServices.RegisterChannel(chnl)

        RemotingConfiguration.ApplicationName = "MyServer"
        RemotingConfiguration.RegisterActivatedServiceType( _
            GetType(MyRemoteObject))


        ' the server will keep running until keypress.
        Console.ReadLine()

    End Sub
End Module


