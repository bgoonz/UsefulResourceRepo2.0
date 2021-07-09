Imports System

Public MustInherit Class BaseRemoteObject
    Inherits MarshalByRefObject
    Public MustOverride Sub setValue(ByVal newval As Integer)
    Public MustOverride Function getValue() As Integer
End Class

Public MustInherit Class BaseWorkerObject
    Inherits MarshalByRefObject
    Public MustOverride Sub doSomething(ByVal usethis As BaseRemoteObject)
End Class