Imports System

Public Interface IRemoteObject
    Sub setValue(ByVal newval As Integer)
    Function getValue() As Integer
End Interface

Public Interface IRemoteFactory
    Overloads Function getNewInstance() As IRemoteObject
    Overloads Function getNewInstance(ByVal initvalue As Integer) As IRemoteObject
End Interface
