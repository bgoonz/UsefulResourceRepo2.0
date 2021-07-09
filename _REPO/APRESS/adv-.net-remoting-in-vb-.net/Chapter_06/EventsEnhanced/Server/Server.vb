Option Explicit On 
Option Strict On

Imports System
Imports System.Runtime.Remoting
Imports General

Class Broadcaster
    Inherits MarshalByRefObject
    Implements IBroadcaster

    Public Event MessageArrived As MessageArrivedHandler _
        Implements IBroadcaster.MessageArrived

    Public Sub BroadcastMessage(ByVal msg As String) _
    Implements IBroadcaster.BroadcastMessage
        Console.WriteLine("Will broadcast message: {0}", msg)
        SafeInvokeEvent(msg)
    End Sub

    Private Sub SafeInvokeEvent(ByVal msg As String)
        ' call the delegates manually and remove them if they aren't
        ' active anymore
        Dim mah As MessageArrivedHandler
        Dim del As System.Delegate

        If MessageArrivedEvent Is Nothing Then
            Console.WriteLine("No Listeners")
        Else
            For Each del In MessageArrivedEvent.GetInvocationList()
                Try
                    mah = CType(del, MessageArrivedHandler)
                    ' call a single client taken from the list
                    mah(msg)
                Catch e As Exception

                    Console.WriteLine("Exception occurred, will remove Delegate")

                    MessageArrivedEvent = CType(System.Delegate.Remove( _
                            MessageArrivedEvent, del), MessageArrivedHandler)
                End Try
            Next
        End If
    End Sub


    Public Overrides Function InitializeLifetimeService() As Object
        ' this object has to live "forever"
        Return Nothing
    End Function
End Class

Module ServerStartup


    Sub Main()
        Dim filename As String = "server.exe.config"
        RemotingConfiguration.Configure(filename)

        ' the server will keep running until keypress.
        Console.WriteLine("Server started, press <return> to exit.")
        Console.ReadLine()
    End Sub
End Module


