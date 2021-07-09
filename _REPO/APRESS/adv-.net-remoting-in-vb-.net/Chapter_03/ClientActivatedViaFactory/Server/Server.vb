Option Explicit On 
Option Strict On

Imports System
Imports System.Runtime.Remoting
Imports General
Imports System.Runtime.Remoting.Channels.Http
Imports System.Runtime.Remoting.Channels


Class MyRemoteObject
    Inherits MarshalByRefObject
    Implements IRemoteObject

    Private myvalue As Integer

    Public Sub New()
        Console.WriteLine("MyRemoteObject.ctor() called")
    End Sub 'New

    Public Sub New(ByVal startvalue As Integer)
        Console.WriteLine("MyRemoteObject.ctor(int) called", _
            startvalue)
        myvalue = startvalue
    End Sub

    Public Sub setValue(ByVal newval As Integer) _
    Implements IRemoteObject.setValue
        Console.WriteLine("MyRemoteObject.setValue(): old {0} new {1}", _
            myvalue, newval)
        myvalue = newval
    End Sub

    Public Function getValue() As Integer _
    Implements IRemoteObject.getValue
        Console.WriteLine("MyRemoteObject.getValue(): current {0}", myvalue)
        Return myvalue
    End Function

End Class

Class MyRemoteFactory
    Inherits MarshalByRefObject
    Implements IRemoteFactory

    Public Sub New()
        Console.WriteLine("MyRemoteFactory.ctor() called")
    End Sub

    Public Function getNewInstance() As IRemoteObject _
    Implements IRemoteFactory.getNewInstance
        Console.WriteLine("MyRemoteFactory.getNewInstance() called")
        Return New MyRemoteObject()
    End Function

    Public Function getNewInstance(ByVal initvalue As Integer) As IRemoteObject _
    Implements IRemoteFactory.getNewInstance
        Console.WriteLine("MyRemoteFactory.getNewInstance(int) called")
        Return New MyRemoteObject(initvalue)
    End Function


End Class

Module ServerStartup

    Sub Main()
        Console.WriteLine("ServerStartup.Main(): Server started")

        Dim chnl As New HttpChannel(1234)
        ChannelServices.RegisterChannel(chnl)

        RemotingConfiguration.RegisterWellKnownServiceType( _
            GetType(MyRemoteFactory), _
            "factory.soap", _
            WellKnownObjectMode.Singleton)

        ' the server will keep running until keypress.
        Console.ReadLine()

    End Sub
End Module


