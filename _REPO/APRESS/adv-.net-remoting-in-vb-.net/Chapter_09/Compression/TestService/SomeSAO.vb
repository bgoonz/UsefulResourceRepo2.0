Option Explicit On 
Option Strict On

Public Class SomeSAO
    Inherits MarshalByRefObject

    Public Function DoSomething() As String

        Console.WriteLine("SomeSAO.doSomething called")
        Return "SomeSAO.doSomething called"
    End Function
End Class

