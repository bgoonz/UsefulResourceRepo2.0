Imports System.Windows.Forms
Module Adapter

    Sub Main()
        Dim objFoodOrderer As FoodOrderer
        Console.WriteLine("Let's order from the Fast Food restaurant: ")
        objFoodOrderer = New FastFoodOrderer()
        objFoodOrderer.Order("1 Cheeseburger")

        Console.WriteLine("Now let's order some French food from their fancy restaurant menu: ")
        objFoodOrderer = New FrenchFoodOrderer()
        objFoodOrderer.Order("Moules Mariniere")

        MessageBox.Show("Click OK to end")
    End Sub

    Public Interface FoodOrderer
        Sub Order(ByVal Request)
    End Interface

    Public Class FastFoodOrderer : Implements FoodOrderer
        Public Sub Order(ByVal Request) Implements FoodOrderer.Order
            Console.WriteLine(Request & " coming up. ")
        End Sub
    End Class

    Public Class FrenchFoodOrderer : Inherits FrenchRestaurant : Implements FoodOrderer
        Public Sub Order(ByVal Request) Implements FoodOrderer.Order
            OrderFromMenu(Request)
        End Sub
    End Class

    Public Class FrenchRestaurant
        Public Sub OrderFromMenu(ByVal Request)
            Console.WriteLine(Request & "? Oui, monsieur. Bon appetit. ")
        End Sub
    End Class

End Module
