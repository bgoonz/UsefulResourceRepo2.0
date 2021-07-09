Module Module1

    Class Child : Inherits MixedLanguageInheritanceExample.Base

        Protected Overrides Function GetFrom() As String
            GetFrom = "multiple languages"
        End Function

    End Class

    Sub Main()
        Dim c As Child = New Child()
        c.SayIt()
    End Sub

End Module
