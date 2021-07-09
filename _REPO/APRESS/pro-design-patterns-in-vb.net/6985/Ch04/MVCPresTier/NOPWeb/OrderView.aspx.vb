Option Strict On

Imports MVC

Public Class OrderView
    Inherits ViewWeb

    Public Shadows Const aspxName As String = "OrderView.aspx"

    Protected Friend WithEvents orderLabel As System.Web.UI.WebControls.Label
    Protected Friend WithEvents Label1 As System.Web.UI.WebControls.Label
    Protected Friend WithEvents Label2 As System.Web.UI.WebControls.Label
    Protected Friend WithEvents Label3 As System.Web.UI.WebControls.Label

    Protected Friend WithEvents customerIDText As System.Web.UI.WebControls.TextBox
    Protected Friend WithEvents orderDateText As System.Web.UI.WebControls.TextBox
    Protected Friend WithEvents productsGrid As System.Web.UI.WebControls.DataGrid

    Protected Friend WithEvents orderButton As System.Web.UI.WebControls.Button
    Protected Friend WithEvents messageLabel As System.Web.UI.WebControls.Label
    Protected Friend WithEvents backToOrdersButton As System.Web.UI.WebControls.Button

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
        Return New OrderControllerFactory()
    End Function

    Private Sub Page_Load(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Load

    End Sub
End Class
