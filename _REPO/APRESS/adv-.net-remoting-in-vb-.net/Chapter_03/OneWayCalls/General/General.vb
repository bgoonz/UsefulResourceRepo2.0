Imports System
Imports System.Runtime.Remoting.Messaging

Public MustInherit Class BaseRemoteObject
    Inherits MarshalByRefObject

    ' No more one-way attribute <OneWay()> 
    Public MustOverride Sub setValue(ByVal newval As Integer)
    Public MustOverride Function getValue() As Integer
    Public MustOverride Function getName() As String
End Class
