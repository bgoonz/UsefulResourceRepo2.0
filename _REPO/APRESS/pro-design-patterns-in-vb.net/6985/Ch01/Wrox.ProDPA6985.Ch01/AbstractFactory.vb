Imports System.Windows.Forms
Module AbstractFactory

    Sub Main()
        Dim objBearFactory As BearFactory
        Dim objDadBear As DadBear
        Dim objMomBear As MomBear
        Dim objBabyBear As BabyBear
        Dim objGoldenPreferred As DialogResult

        ' choose one of these
        objGoldenPreferred = _
             MessageBox.Show("Click Yes for Golden Bears. Click No for Brown Bears", _
                           "Storybook Application", _
                            MessageBoxButtons.YesNo)

        ' create a BearFactory, depending on user's selection
        If objGoldenPreferred = DialogResult.Yes Then
            objBearFactory = New GoldenBearFactory()
        Else
            objBearFactory = New BrownBearFactory()
        End If

        ' use the BearFactory object to create DadBear, MomBear, BabyBear
        objDadBear = objBearFactory.CreateDadBear
        objMomBear = objBearFactory.CreateMomBear
        objBabyBear = objBearFactory.CreateBabyBear

        MessageBox.Show("Click OK to end")
    End Sub

    ' Bear Creation Managers ''''''''''''''''''''''''''''''
    MustInherit Class BearFactory
        Public MustOverride Function CreateDadBear() As DadBear
        Public MustOverride Function CreateMomBear() As MomBear
        Public MustOverride Function CreateBabyBear() As BabyBear
    End Class

    Public Class GoldenBearFactory : Inherits BearFactory
        Public Overrides Function CreateDadBear() As DadBear
            Return New GoldenDadBear()
        End Function

        Public Overrides Function CreateMomBear() As MomBear
            Return New GoldenMomBear()
        End Function

        Public Overrides Function CreateBabyBear() As BabyBear
            Return New GoldenBabyBear()
        End Function
    End Class

    Public Class BrownBearFactory : Inherits BearFactory
        Public Overrides Function CreateDadBear() As DadBear
            Return New BrownDadBear()
        End Function

        Public Overrides Function CreateMomBear() As MomBear
            Return New BrownMomBear()
        End Function

        Public Overrides Function CreateBabyBear() As BabyBear
            Return New BrownBabyBear()
        End Function
    End Class

    ' Bear Implementers '''''''''''''''''''''''''''''''''''
    MustInherit Class DadBear
    End Class

    MustInherit Class MomBear
    End Class

    MustInherit Class BabyBear
    End Class

    Public Class GoldenDadBear : Inherits DadBear
        Public Sub New()
            Console.WriteLine(TypeName(Me).ToString & " Created")
        End Sub
    End Class

    Public Class BrownDadBear : Inherits DadBear
        Public Sub New()
            Console.WriteLine(TypeName(Me).ToString & " Created")
        End Sub
    End Class

    Public Class GoldenMomBear : Inherits MomBear
        Public Sub New()
            Console.WriteLine(TypeName(Me).ToString & " Created")
        End Sub
    End Class

    Public Class BrownMomBear : Inherits MomBear
        Public Sub New()
            Console.WriteLine(TypeName(Me).ToString & " Created")
        End Sub
    End Class

    Public Class GoldenBabyBear : Inherits BabyBear
        Public Sub New()
            Console.WriteLine(TypeName(Me).ToString & " Created")
        End Sub
    End Class

    Public Class BrownBabyBear : Inherits BabyBear
        Public Sub New()
            Console.WriteLine(TypeName(Me).ToString & " Created")
        End Sub
    End Class


End Module
