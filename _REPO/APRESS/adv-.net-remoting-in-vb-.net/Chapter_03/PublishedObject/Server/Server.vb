Option Explicit On 
Option Strict On

Imports System
Imports System.Runtime.Remoting
Imports General
Imports System.Runtime.Remoting.Channels.Http
Imports System.Runtime.Remoting.Channels
Imports Microsoft.VisualBasic


Class MyRemoteObject
    Inherits MarshalByRefObject
    Implements IMyRemoteObject

    Private myvalue As Integer

    Public Sub New()
        Console.WriteLine("MyRemoteObject.Constructor: New Object created")
    End Sub 'New

    Public Sub New(ByVal startvalue As Integer)
        Console.WriteLine("MyRemoteObject.Constructor: .ctor called with {0}", startvalue)
        myvalue = startvalue
    End Sub

    Public Sub setValue(ByVal newval As Integer) Implements IMyRemoteObject.setValue
        Console.WriteLine("MyRemoteObject.setValue(): old {0} new {1}", myvalue, newval)
        myvalue = newval
    End Sub

    Public Function getValue() As Integer Implements IMyRemoteObject.getValue
        Console.WriteLine("MyRemoteObject.getValue(): current {0}", myvalue)
        Return myvalue
    End Function

End Class

Module ServerStartup

    Sub Main()
        Console.WriteLine("ServerStartup.Main(): Server started")

        Dim chnl As New HttpChannel(1234)
        ChannelServices.RegisterChannel(chnl)

        Dim obj As MyRemoteObject = New MyRemoteObject(4711)
        RemotingServices.Marshal(obj, "MyRemoteObject.soap")

        ' the server will keep running until keypress.
        Console.ReadLine()

    End Sub
End Module


