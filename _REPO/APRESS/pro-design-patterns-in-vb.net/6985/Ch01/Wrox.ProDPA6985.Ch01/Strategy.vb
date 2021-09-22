Imports System.Windows.Forms
Module Strategy

    Sub Main()
        Console.WriteLine("Submit payment for $123.45 on MasterCard #512-125-125")
        Dim objCC As New CreditCardProcessor(New MasterCardProcessor())
        objCC.SubmitPayment("512-125-125", 123.45)

        Console.WriteLine("Submit payment for $10000 on VISA card #123")
        objCC = New CreditCardProcessor(New VISAProcessor())
        objCC.SubmitPayment("123", 10000D)

        MessageBox.Show("Click OK to end")
    End Sub

    Public Interface ValidationStrategy
        Function IsValid(ByVal Account As String) As Boolean
    End Interface

    Public Class MasterCardProcessor : Implements ValidationStrategy
        Public Function IsValid(ByVal Account As String) As Boolean Implements ValidationStrategy.IsValid
            If Account.StartsWith("5") Then
                Return True
            Else
                Return False
            End If
        End Function
    End Class

    Public Class VISAProcessor : Implements ValidationStrategy
        Public Function IsValid(ByVal Account As String) As Boolean Implements ValidationStrategy.IsValid
            If Account.Length > 5 Then
                Return True
            Else
                Return False
            End If
        End Function
    End Class

    Public Class CreditCardProcessor
        Private m_ValidationStrategy As ValidationStrategy

        Public Sub New(ByVal vs As ValidationStrategy)
            m_ValidationStrategy = vs
        End Sub

        Public Sub SubmitPayment(ByVal Account As String, ByVal Amount As Double)
            If m_ValidationStrategy.IsValid(Account) Then
                Console.WriteLine("Request for submitted payment!")
            Else
                Console.WriteLine("Reject this card!")
            End If
        End Sub
    End Class


End Module
