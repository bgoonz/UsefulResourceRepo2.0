Option Strict On

Imports MVC

Public Class OrdersView
    Inherits ViewWeb

    Public Shadows Const aspxName As String = "OrdersView.aspx"
    Protected Friend WithEvents Label1 As System.Web.UI.WebControls.Label
    Protected Friend WithEvents ordersGrid As System.Web.UI.WebControls.DataGrid

#Region " Web Form Designer Generated Code "

    'This call is required by the Web Form Designer.
    <System.Diagnostics.DebuggerStepThrough()> Private Sub InitializeComponent()

    End Sub

    Private Sub Page_Init(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Init
        'CODEGEN: This method call is required by the Web Form Designer
        'Do not modify it using the code editor.
        InitializeComponent()
    End Sub

#End Region

    Protected Overrides Function getControllerFactory() As ControllerFactory
        Return New OrdersControllerFactory()
    End Function


End Class
