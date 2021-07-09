Option Strict On

Imports System.Data

Friend Class NOPData
    Private _ds As New DataSet()
    Private _orders As New DataTable("Order")
    Private _products As New DataTable("Product")

    Public Sub New()
        'locals
        Dim orderOrderIDColumn As New DataColumn("OrderID", _
                                            Type.GetType("System.Int32"))
        Dim productOrderIDColumn As _
                    New DataColumn(orderOrderIDColumn.ColumnName, _
                                            Type.GetType("System.Int32"))
        Dim productIDColumn As New DataColumn("ProductID", _
                                            Type.GetType("System.Int32"))
        Dim orderRowRelation As DataRelation
        Dim row As DataRow
        Dim rowValues As Object()

        'build schema
        With _ds
            'Order table
            .Tables.Add(_orders)
            With _orders.Columns
                .Add(orderOrderIDColumn)
                _orders.PrimaryKey = New DataColumn() {orderOrderIDColumn}
                .Add(New DataColumn("CustomerID", Type.GetType("System.String")))
                .Add(New DataColumn("OrderDate", Type.GetType("System.DateTime")))
                .Add(New DataColumn("OrderType", _
                                              Type.GetType("NOPModel.OrderType")))
            End With
            'Product table
            .Tables.Add(_products)
            With _products.Columns
                .Add(productIDColumn)
                _products.PrimaryKey = New DataColumn() {productIDColumn}
                .Add(productOrderIDColumn)
                .Add(New DataColumn("Name", Type.GetType("System.String")))
                .Add(New DataColumn("Qty", Type.GetType("System.UInt32")))
                .Add(New DataColumn("Price", Type.GetType("System.Double")))
                .Add(New DataColumn("RequiredDate", _
                                           Type.GetType("System.DateTime")))
            End With

            'Order/Product relationship
            orderRowRelation = .Relations.Add("Order_Product", _
                                   orderOrderIDColumn, productOrderIDColumn)
            'constraints
            With orderOrderIDColumn
                .Unique = True
                .ReadOnly = True
                .AutoIncrementSeed = 100
                .AutoIncrementStep = 1
                .AutoIncrement = True
            End With
            With productOrderIDColumn
                .ReadOnly = True
            End With
            With productIDColumn
                .Unique = True
                .ReadOnly = True
                .AutoIncrementSeed = 200
                .AutoIncrementStep = 1
                .AutoIncrement = True
            End With
        End With

        'sample data
        row = _orders.Rows.Add(New Object() {Nothing, "pete", _
                                             #1/1/2002#, OrderType.Normal})
        _products.Rows.Add(New Object() {Nothing, _
                                        row(orderOrderIDColumn.ColumnName), _
                                        "beer", 100, 3.5, #1/2/2002#})
        _products.Rows.Add(New Object() {Nothing, _
                                        row(orderOrderIDColumn.ColumnName), _
                                        "pizza", 3, 10, #1/2/2002#})
        row = _orders.Rows.Add(New Object() {Nothing, "jon", _
                                             #2/1/2002#, OrderType.Special})
        _products.Rows.Add(New Object() {Nothing, _
                                        row(orderOrderIDColumn.ColumnName), _
                                        "milk", 50, 1.5, #2/2/2002#})
    End Sub

    Public ReadOnly Property orders() As DataTable
        Get
            Return _orders
        End Get
    End Property

    Public ReadOnly Property products() As DataTable
        Get
            Return _products
        End Get
    End Property

End Class


Public Class Orders
    Private _nopData As NOPData
    Private _ordersData As DataView = New DataView()

    Public Sub New()
        _nopData = New NOPData()
        With _ordersData
            .Table = _nopData.orders
        End With
    End Sub

    Public ReadOnly Property ordersData() As DataView
        Get
            Return _ordersData
        End Get
    End Property

    Public Function getOrder(ByVal orderID As Integer) As Order
        Return New Order(orderID, _nopData)
    End Function
End Class


Public Enum OrderType
    Normal
    Special
End Enum


Public Class Order
    Private _nopData As NOPData
    Private _orderID As Integer
    Private _orderType As orderType
    Private _orderData As DataView = New DataView()
    Private _productsData As DataView = New DataView()

    Friend Sub New(ByVal orderID As Integer, ByRef nopData As NOPData)
        'nopData
        _nopData = nopData
        'orderID
        _orderID = orderID
        'orderData
        With _orderData
            .Table = _nopData.orders
            .RowFilter = "OrderID = " & orderID
        End With
        'orderType
        Dim orderRow As DataRow = _orderData.Item(0).Row
        _orderType = CType(orderRow.Item("OrderType"), OrderType)
        'productsData
        With _productsData
            .Table = _nopData.products
            .RowFilter = "OrderID = " & orderID
        End With
    End Sub

    Public ReadOnly Property orderID() As Integer
        Get
            Return _orderID
        End Get
    End Property

    Public ReadOnly Property orderType() As NOPModel.OrderType
        Get
            Return _orderType
        End Get
    End Property

    Public ReadOnly Property orderData() As DataView
        Get
            Return _orderData
        End Get
    End Property

    Public ReadOnly Property productsData() As DataView
        Get
            Return _productsData
        End Get
    End Property
End Class

