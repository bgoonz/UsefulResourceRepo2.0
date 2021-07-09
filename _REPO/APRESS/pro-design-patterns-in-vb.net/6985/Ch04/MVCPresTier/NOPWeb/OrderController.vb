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
    Protected WithEvents _customerIDText As TextBox
    Protected WithEvents _orderDateText As TextBox
    Protected WithEvents _productsGrid As DataGrid
    Protected WithEvents _orderButton As Button
    Protected WithEvents _backToOrdersButton As Button
    'other class-level variables
    Protected _orderData As DataView

    'overriden Controller members

    Protected Overrides Sub setTypedViewReference()
        _orderView = CType(_view, OrderView)
    End Sub

    Protected Overrides Sub setTypedModelReferences()
        _order = CType(_models(0), Order)
    End Sub

    Protected Overrides Sub setViewWithEventsReferences()
        With _orderView
            _customerIDText = .customerIDText
            _orderDateText = .orderDateText
            _productsGrid = .productsGrid
            _orderButton = .orderButton
            _backToOrdersButton = .backToOrdersButton
        End With
    End Sub

    Protected Overrides Sub setViewDataBindings()
        'order data
        _orderData = _order.orderData
        _customerIDText.DataBind()
        _orderDateText.DataBind()
        'products data
        With _productsGrid
            .DataSource = _order.productsData
            .DataBind()
        End With
    End Sub

    'View event handling procedures

    Private Sub _customerIDText_DataBinding(ByVal sender As Object, _
                                            ByVal e As System.EventArgs) _
                              Handles _customerIDText.DataBinding
        If _orderView.IsPostBack Then
            _orderData.Item(0).Item("CustomerID") = CStr(_customerIDText.Text)
        Else
            _customerIDText.Text = CStr(_orderData.Item(0).Item("CustomerID"))
        End If
    End Sub

    Private Sub _orderDateText_DataBinding(ByVal sender As Object, _
                                           ByVal e As System.EventArgs) _
                              Handles _orderDateText.DataBinding
        If _orderView.IsPostBack Then
            _orderData.Item(0).Item("OrderDate") = CDate(_orderDateText.Text)
        Else
            _orderDateText.Text = CStr(_orderData.Item(0).Item("OrderDate"))
        End If
    End Sub

    Private Sub _backToOrdersButton_Click(ByVal sender As Object, _
                                          ByVal e As System.EventArgs) _
                              Handles _backToOrdersButton.Click
        'switch View to OrdersView
        _orderView.Server.Transfer(OrdersView.aspxName)
    End Sub
End Class


Public Class NormalOrderController
    Inherits OrderController

    'View event handling procedures

    Private Sub _orderView_Load(ByVal sender As Object, _
                                ByVal e As System.EventArgs) _
                                               Handles _orderView.Load
        _orderView.orderLabel.Text = "Normal Order"
    End Sub

    Private Sub _orderButton_Click(ByVal sender As Object, _
                                   ByVal e As System.EventArgs) _
                                               Handles _orderButton.Click
        _orderView.messageLabel.Text = "Order sent from NormalOrderController!"
    End Sub
End Class


Public Class SpecialOrderController
    Inherits OrderController

    'View event handling procedures

    Private Sub _orderView_Load(ByVal sender As Object, _
                                ByVal e As System.EventArgs) _
                                            Handles _orderView.Load
        With _orderView
            .orderLabel.Text = "Special Order"
            'remove RequiredDate field from the DataGrid
            With .productsGrid.Columns
                .Item(.Count - 1).Visible = False
            End With
        End With
    End Sub

    Private Sub _orderButton_Click(ByVal sender As Object, _
                                   ByVal e As System.EventArgs) _
                                               Handles _orderButton.Click
        _orderView.messageLabel.Text = "Order sent from SpecialOrderController!"
    End Sub
End Class


Public Class OrderControllerFactory
    Inherits ControllerFactoryWebBase

    'overriden Controller factory members

    Protected Overrides Function getModels() As Object()
        'get orders from Session
        Dim orders As Orders = getOrdersFromSession(_view)
        'get order id from Request
        Dim httpRequest As HttpRequest = CType(_view, ViewWeb).Request
        Dim orderID As Integer = CInt(httpRequest.QueryString.Item("order_id"))
        'get order
        Dim order As Order = Orders.getOrder(orderID)
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

