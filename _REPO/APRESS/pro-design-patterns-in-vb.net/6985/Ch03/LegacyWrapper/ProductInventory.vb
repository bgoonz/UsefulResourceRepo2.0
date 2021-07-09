Option Strict Off
Option Explicit On 

Public Class ProductInventory

    Private m_Inventory As New Inventory.ProductClass()

    Public Function CheckProductPrice( _
    ByVal productID As Long, ByVal price As Double) _
    As Boolean

        Dim result As Integer

        Try

            result = m_Inventory.PriceCheck(productID, price)

            If result > 0 Then
                Return True
            Else
                Return False
            End If

        Catch e As Exception
            Throw New Exception( _
            "Unable to check price for Product ID = " & productID, e)
        End Try

    End Function

    Public Function UnitsInStock(ByVal productID As Long) As Long

        Dim result As Integer

        Try

            result = m_Inventory.InstockCount(productID)

            Return CLng(result)

        Catch e As Exception
            Throw New Exception( _
            "Unable to retrieve units in stock for Product ID = " & productID, e)
        End Try

    End Function


End Class

