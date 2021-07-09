Option Explicit On 
Option Strict On

Imports System
Imports System.Runtime.Remoting.Messaging

Public Delegate Sub MessageArrivedHandler(ByVal msg As String)

Public Interface IBroadcaster
    Sub BroadcastMessage(ByVal msg As String)
    Event MessageArrived As MessageArrivedHandler
End Interface

Public Class BroadcastEventWrapper
    Inherits MarshalByRefObject

    Public Event MessageArrivedLocally As MessageArrivedHandler
    Public WithEvents bcaster As IBroadCaster

    Public Sub New(ByVal bc As IBroadCaster)
        bcaster = bc
    End Sub

    Public Sub bcaster_MessageArrived(ByVal msg As String) _
    Handles bcaster.MessageArrived
        RaiseEvent MessageArrivedLocally(msg)
    End Sub

    Public Overrides Function InitializeLifetimeService() As Object
        ' this object has to live "forever"
        Return Nothing
    End Function
End Class