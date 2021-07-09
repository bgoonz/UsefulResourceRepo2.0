Imports System

Module DelegateDemo

    Delegate Function doSthDelegate(ByVal myValue As Integer) As String

    Public Function doSomething(ByVal myValue As Integer) As String
        Return "HEY:" + myValue.ToString()
    End Function

    Sub Main()
        Dim del As New doSthDelegate(AddressOf doSomething)
        Dim ar As IAsyncResult = del.BeginInvoke(42, Nothing, Nothing)

        ' ... do something different here

        Dim res As String = del.EndInvoke(ar)

        Console.WriteLine("Got result: '{0}'", res)

        'wait for return to close
        Console.ReadLine()
    End Sub

End Module