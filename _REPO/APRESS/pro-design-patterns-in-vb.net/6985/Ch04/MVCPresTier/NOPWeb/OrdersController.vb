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
        End With
    End Sub

    Protected Overrides Sub setViewDataBindings()
        With _ordersGrid
            .DataSource = _orders.ordersData
            .DataBind()
        End With
    End Sub

    'View event handling procedures

    Private Sub _ordersGrid_ItemCommand(ByVal source As Object, _
              ByVal e As System.Web.UI.WebControls.DataGridCommandEventArgs) _
            Handles _ordersGrid.ItemCommand
        Select Case e.CommandName
            Case "ViewOrder"
                Dim orderRow As DataRow = _
                                 _orders.ordersData.Item(e.Item.ItemIndex).Row
                Dim orderID As Integer = CInt(orderRow.Item("OrderID"))
                'pass data to new View via query string
                Dim viewURL As String = _
                             OrderView.aspxName & "?order_id=" & CStr(orderID)
                _ordersView.Server.Transfer(viewURL)
        End Select
    End Sub
End Class


Public MustInherit Class ControllerFactoryWebBase
    Inherits ControllerFactory

    Protected Function getOrdersFromSession(ByRef view As IView) As Orders
        'constants
        Const CorderModelSessionKeyName As String = "orders_model"
        'get orders data from ASP.NET session
        Dim viewWeb As ViewWeb = CType(view, ViewWeb)
        Dim session As System.Web.SessionState.HttpSessionState = _
                                                          viewWeb.Session
        Dim orders As Orders
        If session.Item(CorderModelSessionKeyName) Is Nothing Then
            'generate new Orders object and persist it to session
            orders = New Orders()
            session.Item(CorderModelSessionKeyName) = orders
        Else
            'get orders from session
            orders = CType(session.Item(CorderModelSessionKeyName), Orders)
        End If
        Return orders
    End Function
End Class


Public Class OrdersControllerFactory
    Inherits ControllerFactoryWebBase

    'overriden Controller factory members

    Protected Overrides Function getModels() As Object()
        Dim orders As Orders = getOrdersFromSession(_view)
        Dim models() As Object = {orders}
        Return models
    End Function

    Protected Overrides Function getController() As Controller
        Return New OrdersController()
    End Function
End Class

