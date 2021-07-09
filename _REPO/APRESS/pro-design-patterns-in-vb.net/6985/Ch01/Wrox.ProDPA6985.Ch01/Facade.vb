Imports System.Windows.Forms
Module Facade

    Sub Main()
        Dim objHost As New Host()
        objHost.EntertainGuests("Pasta")
        MessageBox.Show("Click OK to end")
    End Sub

    Public Class Host
        Public Function EntertainGuests(ByVal Entree As String)
            Dim objSupermarketVisit As New SupermarketVisit()
            Dim objMealPreparer As New MealPreparer()
            Dim objCleaner As New Cleaner()

            objMealPreparer.CookFood(objSupermarketVisit.BuyFood(Entree))
            objCleaner.ClearTable()
            objCleaner.WashDishes()

            Console.WriteLine("What a pleasant evening. ")
        End Function
    End Class

    Public Class SupermarketVisit
        Public Function BuyFood(ByVal Food As String)
            Console.WriteLine("Buying some " & Food & "...")
            Return Food
        End Function
    End Class

    Public Class MealPreparer
        Public Function CookFood(ByVal Food As String)
            Console.WriteLine("Cooking the " & Food & "...")
            Return Food
        End Function
    End Class

    Public Class Cleaner
        Public Sub ClearTable()
            Console.WriteLine("Clearing the Table...")
        End Sub
        Public Sub WashDishes()
            Console.WriteLine("Washing the Dishes...")
        End Sub
    End Class


End Module
