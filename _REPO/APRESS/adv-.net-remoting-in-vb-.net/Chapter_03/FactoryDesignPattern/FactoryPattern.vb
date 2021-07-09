Imports System

Class SomeClass
End Class

Class MyFactory

    Public Function getNewInstance() As SomeClass
        Return New SomeClass()
    End Function
End Class

Module Client
    Sub Main()
        ' creation using "New"
        Dim obj1 As New SomeClass()

        ' creation using a factory
        Dim fac As New MyFactory()
        Dim obj2 As SomeClass = fac.getNewInstance()
    End Sub
End Module
