Imports System

Public MustInherit Class BaseRemoteObject
    Inherits MarshalByRefObject

    Public MustOverride Sub setValue(ByVal newval As Integer)
    Public MustOverride Function getValue() As Integer
    Public MustOverride Function getName() As String
End Class
