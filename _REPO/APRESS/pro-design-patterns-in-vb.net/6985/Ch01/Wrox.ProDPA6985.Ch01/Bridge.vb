Imports System.Windows.Forms
Module Bridge
    Sub Main()
        Dim objPurchaseOrder As PurchaseOrder
        Dim objSupplier As Supplier

        Console.WriteLine("Order some office supplies from the retail store:")
        objSupplier = New RetailStore()
        objPurchaseOrder = New OfficeSuppliesPO(objSupplier, 544628)
        Console.WriteLine(objPurchaseOrder.Order(5000))

        Console.WriteLine("Now order some manufacturing materials " & _
                          "from the wholesaler:")
        objSupplier = New Wholesaler()
        objPurchaseOrder = New ManufacturingMaterialsPO(objSupplier, 7791028)
        Console.WriteLine(objPurchaseOrder.Order(5000))

        MessageBox.Show("Click OK to end")
    End Sub




    ' PurchaseOrders
    ' The interface side of the bridge ''''''''''''''''''''''
    Public MustInherit Class PurchaseOrder
        Protected m_ProductID As Integer
        Protected m_Supplier As Supplier

        Protected Sub New(ByRef s As Supplier, ByVal ProductID As Integer)
            m_ProductID = ProductID
            m_Supplier = s
        End Sub

        Public MustOverride Function Order(ByVal Quantity As Integer) As String
    End Class

    ' The implementation side of the bridge ''''''''''''''''''''''
    Public Class OfficeSuppliesPO : Inherits PurchaseOrder
        Public Sub New(ByRef Vendor As Supplier, ByVal ProductID As Integer)
            MyBase.New(Vendor, ProductID)
        End Sub

        Public Overrides Function Order(ByVal Quantity As Integer) As String
            If Quantity < 10 Then
                Return m_Supplier.Submit(m_ProductID, Quantity)
            Else
                Return TypeName(Me).ToString & _
                                           " only handles small quantity orders!"
            End If
        End Function
    End Class

    Public Class ManufacturingMaterialsPO : Inherits PurchaseOrder
        Public Sub New(ByRef Vendor As Supplier, ByVal ProductID As Integer)
            MyBase.New(Vendor, ProductID)
        End Sub

        Public Overrides Function Order(ByVal Quantity As Integer) As String
            If Quantity > 1000 Then
                Return m_Supplier.Submit(m_ProductID, Quantity)
            Else
                Return TypeName(Me).ToString & _
                                           " only handles large quantity orders!"
            End If
        End Function
    End Class





    ' Suppliers
    ' The interface side of the bridge ''''''''''''''''''''''
    Public MustInherit Class Supplier
        MustOverride Function Submit(ByVal ProductID As Integer, _
                                     ByVal Quantity As Double) As String
    End Class


    ' The implementation side of the bridge ''''''''''''''''''''''
    Public Class RetailStore : Inherits Supplier
        Public Overrides Function Submit(ByVal ProductID As Integer, _
                                         ByVal Quantity As Double) As String
            Return VisitStore(ProductID, Quantity)
        End Function

        Private Function VisitStore(ByVal ProductID As Integer, _
                                    ByVal Quantity As Double) As String
            If Quantity < 5 Then
                Return Quantity.ToString & " x Product #" & ProductID.ToString & _
                                           " is on your desk."
            Else
                Return Quantity.ToString & " x Product #" & ProductID.ToString & _
                                           " is due tomorrow."
            End If
        End Function
    End Class


    Public Class Wholesaler : Inherits Supplier
        Public Overrides Function Submit(ByVal ProductID As Integer, _
                                         ByVal Quantity As Double) As String
            Return Quantity.ToString & " x Product #" & ProductID.ToString & _
                                       " will be shipped next week."
        End Function
    End Class


End Module
