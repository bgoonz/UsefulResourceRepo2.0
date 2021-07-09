Imports System.Windows.Forms
Module Observer

    Sub Main()
        Dim objExpensesProcessor As New ExpensesProcessor()
        Dim objTravelExpenseHandler As New TravelExpenseHandler()
        Dim objTrainingExpenseHandler As New TrainingExpenseHandler()

        Console.WriteLine("Register two observer objects...")
        objExpensesProcessor.Register(objTravelExpenseHandler)
        objExpensesProcessor.Register(objTrainingExpenseHandler)
        Console.WriteLine("Now submit first batch of expenses...")
        objExpensesProcessor.Process()

        Console.WriteLine("")
        Console.WriteLine("Now unregister one of the observer objects...")
        objExpensesProcessor.UnRegister(objTrainingExpenseHandler)
        Console.WriteLine("Now submit second batch of expenses...")
        objExpensesProcessor.Process()

        MessageBox.Show("Click OK to end")
    End Sub

    Public Interface ExpenseObserver
        Sub Notify(ByRef obj As Object)
    End Interface

    Public Interface ExpenseNotifier
        Sub Register(ByRef eo As ExpenseObserver)
        Sub UnRegister(ByRef eo As ExpenseObserver)
    End Interface

    Public Class ExpensesProcessor : Implements ExpenseNotifier
        Dim m_Observers As New Hashtable()

        Public Sub Register(ByRef eo As ExpenseObserver) Implements ExpenseNotifier.Register
            m_Observers.Add(eo, eo)
        End Sub

        Public Sub UnRegister(ByRef ew As ExpenseObserver) Implements ExpenseNotifier.UnRegister
            m_Observers.Remove(ew)
        End Sub

        Public Function Process()
            Dim ProcessTime As DateTime = DateTime.UtcNow
            Dim aObserver As ExpenseObserver
            For Each aObserver In m_Observers.Keys
                aObserver.Notify(ProcessTime)
            Next
        End Function
    End Class

    Public Class TravelExpenseHandler : Implements ExpenseObserver
        Sub Notify(ByRef obj As Object) Implements ExpenseObserver.Notify
            Console.WriteLine("Travel Expenses processed on " & obj)
        End Sub
    End Class

    Public Class TrainingExpenseHandler : Implements ExpenseObserver
        Sub Notify(ByRef obj As Object) Implements ExpenseObserver.Notify
            Console.WriteLine("Training Expenses processed on " & obj)
        End Sub
    End Class


End Module
