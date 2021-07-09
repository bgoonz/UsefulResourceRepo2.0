Option Strict On

Imports MVC
Imports NOPModel

Public MustInherit Class OrderController
    Inherits Controller

    'strongly typed View reference
    Protected WithEvents _orderView As OrderView
    'strongly typed Model references
    Protected _order As Order
    'View WithEvents references
    Protected WithEvents _orderButton As Button
    'other class-level variables
    Protected _orderData As DataView
    Protected WithEvents _productsData As DataView

    'overriden Controller members

    Protected Overrides Sub setTypedViewReference()
        _orderView = CType(_view, OrderView)
    End Sub

    Protected Overrides Sub setTypedModelReferences()
        _order = CType(_models(0), Order)
    End Sub

    Protected Overrides Sub setViewWithEventsReferences()
        With _orderView
            _orderButton = .orderButton
        End With
    End Sub

    Protected Overrides Sub setViewDataBindings()
        With _orderView
            'order data
            _orderData = _order.orderData
            .customerIDText.DataBindings.Add(New Binding("Text", _orderData, _
                                                             "CustomerID"))
            .orderDateText.DataBindings.Add(New Binding("Text", _orderData, _
                                                             "OrderDate"))
            'products data
            _productsData = _order.productsData
            .productsGrid.DataSource = _productsData
        End With
    End Sub

    'View event handling procedures

    'other event handling procedures

    Private Sub _productsData_ListChanged(ByVal sender As Object, _
                     ByVal e As System.ComponentModel.ListChangedEventArgs) _
                     Handles _productsData.ListChanged
        If e.ListChangedType = _
                         System.ComponentModel.ListChangedType.ItemAdded Then
            'set the OrderID field of a newly added product
            _productsData.Item(_productsData.Count - 1)("OrderID") = _
                                                               _order.orderID
        End If
    End Sub
End Class


Public Class NormalOrderController
    Inherits OrderController

    'View event handling procedures

    Private Sub _orderView_Load(ByVal sender As Object, _
                      ByVal e As System.EventArgs) Handles _orderView.Load
        _orderView.Text = "Normal Order"
    End Sub

    Private Sub _orderButton_Click(ByVal sender As Object, _
                   ByVal e As System.EventArgs) Handles _orderButton.Click
        MsgBox("Order sent from NormalOrderController!")
    End Sub
End Class


Public Class SpecialOrderController
    Inherits OrderController

    'View event handling procedures

    Private Sub _orderView_Load(ByVal sender As Object, _
                       ByVal e As System.EventArgs) Handles _orderView.Load
        With _orderView
            .Text = "Special Order"
            .productsGridTableStyle.GridColumnStyles.Remove(.requiredDateColumn)
        End With
    End Sub

    Private Sub _orderButton_Click(ByVal sender As Object, _
                    ByVal e As System.EventArgs) Handles _orderButton.Click
        MsgBox("Order sent from SpecialOrderController!")
    End Sub
End Class


Public Class OrderControllerFactory
    Inherits ControllerFactory

    'overriden Controller factory members

    Protected Overrides Function getModels() As Object()
        'get orders from view args
        Dim orders As Orders = CType(_viewArgs(0), Orders)
        'get order id from view args
        Dim orderID As Integer = CInt(_viewArgs(1))
        'get order
        Dim order As Order = orders.getOrder(orderID)
        'populate and return models array
        Dim models() As Object = {order}
        Return models
    End Function

    Protected Overrides Function getController() As Controller
        Dim order As Order = CType(_models(0), Order)
        'return proper OrderController depending on type of order in Model
        Select Case order.orderType
            Case OrderType.Normal
                Return New NormalOrderController()
            Case OrderType.Special
                Return New SpecialOrderController()
        End Select
    End Function
End Class



