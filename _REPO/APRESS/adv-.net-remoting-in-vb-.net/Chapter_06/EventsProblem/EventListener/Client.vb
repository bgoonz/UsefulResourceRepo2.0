Option Explicit On 
Option Strict On

Imports System
Imports System.Runtime.Remoting
Imports General
Imports System.Runtime.Remoting.Channels.Http
Imports System.Runtime.Remoting.Channels

Module Client

    Sub Main()
        Dim filename As String = "eventlistener.exe.config"
        RemotingConfiguration.Configure(filename)


        Dim eh As New MyEventHandler()

        Console.WriteLine("Waiting for message ...")
        Console.ReadLine()
    End Sub

    Public Class MyEventHandler
        Inherits MarshalByRefObject

        Dim WithEvents bcaster As IBroadcaster

        Public Sub New()
            bcaster = CType(RemotingHelper.GetObject( _
                GetType(IBroadcaster)), IBroadcaster)
        End Sub

        Public Sub bcaster_MessageArrived(ByVal msg As String) _
        Handles bcaster.MessageArrived
            Console.WriteLine("Message: " & msg)
        End Sub

        Public Overrides Function InitializeLifetimeService() As Object
            ' this object has to live "forever"
            Return Nothing
        End Function
    End Class

End Module