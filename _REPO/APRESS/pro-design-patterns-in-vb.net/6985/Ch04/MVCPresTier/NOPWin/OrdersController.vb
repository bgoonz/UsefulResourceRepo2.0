Option Strict On

Imports MVC
Imports NOPModel

Public Class OrdersController
    Inherits Controller

    'strongly typed View reference
    Protected WithEvents _ordersView As OrdersView
    'strongly typed Model references
    Protected _orders As Orders
    'View WithEvents references
    Protected WithEvents _ordersGrid As DataGrid
    Protected WithEvents _viewOrderButton As Button
    Protected WithEvents _orderAllButton As Button

    'overriden Controller members

    Protected Overrides Sub setTypedViewReference()
        _ordersView = CType(_view, OrdersView)
    End Sub

    Protected Overrides Sub setTypedModelReferences()
        _orders = CType(_models(0), Orders)
    End Sub

    Protected Overrides Sub setViewWithEventsReferences()
        With _ordersView
            _ordersGrid = .ordersGrid
            _viewOrderButton = .viewOrderButton
            _orderAllButton = .orderAllButton
        End With
    End Sub

    Protected Overrides Sub setViewDataBindings()
        _ordersGrid.DataSource = _orders.ordersData
    End Sub

    'View event handling procedures
    Private Sub _viewOrderButton_Click(ByVal sender As Object, _
                                       ByVal e As System.EventArgs) _
                                           Handles _viewOrderButton.Click
        Dim orderRow As DataRow = _
               _orders.ordersData.Item(_ordersGrid.CurrentRowIndex).Row
        Dim orderID As Integer = CInt(orderRow.Item("OrderID"))
        Dim orderView As New OrderView()
        With orderView
            .initViewWin(_orders, orderID)
            .ShowDialog()
        End With
    End Sub

    Private Sub _orderAllButton_Click(ByVal sender As Object, _
                                      ByVal e As System.EventArgs) _
                                          Handles _orderAllButton.Click
        MsgBox("All orders have been placed!")
    End Sub
End Class


Public Class OrdersControllerFactory
    Inherits ControllerFactory

    'overriden Controller factory members
    Protected Overrides Function getModels() As Object()
        Dim orders As New Orders()
        Dim models() As Object = {orders}
        Return models
    End Function

    Protected Overrides Function getController() As Controller
        Return New OrdersController()
    End Function
End Class
