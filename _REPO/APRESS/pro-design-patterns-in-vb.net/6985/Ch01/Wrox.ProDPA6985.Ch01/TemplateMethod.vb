Imports System.Windows.Forms
Module TemplateMethod

    Sub Main()
        Dim objDebitsProcessor As New DebitsProcessor()
        Dim objCreditsProcessor As New CreditsProcessor()

        Console.WriteLine("Increment the Training Expense account by $10.50...")
        objDebitsProcessor.SetAmount(10.5D)
        objDebitsProcessor.Process("Training Expense")

        Console.WriteLine("Decrement the Accounts Payable by $10.50...")
        objCreditsProcessor.SetAmount(10.5D)
        objCreditsProcessor.Process("Accounts Payable")

        MessageBox.Show("Click OK to end")
    End Sub

    Public MustInherit Class AccountsProcessor
        Protected m_Amount As Integer
        Public Sub Process(ByVal Account As String)
            Console.WriteLine(Account & " adjusted by " & m_Amount)
        End Sub
        Public MustOverride Sub SetAmount(ByVal Amount As Double)
    End Class

    Public Class DebitsProcessor : Inherits AccountsProcessor
        Public Overrides Sub SetAmount(ByVal Amount As Double)
            m_Amount = Math.Round(Amount, 2) * 100
        End Sub
    End Class

    Public Class CreditsProcessor : Inherits AccountsProcessor
        Public Overrides Sub SetAmount(ByVal Amount As Double)
            m_Amount = -1 * Math.Round(Amount, 2) * 100
        End Sub
    End Class


End Module
