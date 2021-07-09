Option Explicit On 
Option Strict On

Imports System

Public Delegate Sub MessageArrivedHandler(ByVal msg As String)

Public Interface IBroadcaster
    Sub BroadcastMessage(ByVal msg As String)
    Event MessageArrived As MessageArrivedHandler
End Interface
