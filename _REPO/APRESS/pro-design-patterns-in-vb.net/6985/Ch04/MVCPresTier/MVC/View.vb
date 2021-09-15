Option Strict On

Public Interface IView
End Interface

Public Class ViewWin
    Inherits System.Windows.Forms.Form
    Implements IView

    Protected _controller As Controller

#Region " Windows Form Designer generated code "

    Public Sub New()
        MyBase.New()

        'This call is required by the Windows Form Designer.
        InitializeComponent()

        'Add any initialization after the InitializeComponent() call

    End Sub

    'Form overrides dispose to clean up the component list.
    Protected Overloads Overrides Sub Dispose(ByVal disposing As Boolean)
        If disposing Then
            If Not (components Is Nothing) Then
                components.Dispose()
            End If
        End If
        MyBase.Dispose(disposing)
    End Sub

    'Required by the Windows Form Designer
    Private components As System.ComponentModel.IContainer

    'NOTE: The following procedure is required by the Windows Form Designer
    'It can be modified using the Windows Form Designer.  
    'Do not modify it using the code editor.
    <System.Diagnostics.DebuggerStepThrough()> Private Sub InitializeComponent()
        components = New System.ComponentModel.Container()
        Me.Text = "ViewWin"
    End Sub

#End Region

    Public Sub initViewWin(ByVal ParamArray viewArgs() As Object)
        'get concrete ControllerFactory class
        Dim controllerFactory As ControllerFactory = getControllerFactory()

        'createController is called and viewArgs are passed
        If Not controllerFactory Is Nothing Then
            _controller = controllerFactory.createController(Me, viewArgs)
        End If
    End Sub

    Protected Overridable Function getControllerFactory() _
                                                       As ControllerFactory
        'subclass must implement and return a concrete ControllerFactory class
    End Function

End Class


Public Class ViewWeb
    Inherits System.Web.UI.Page
    Implements IView

    Public Const aspxName As String = "ViewWeb_baseclass.aspx"
    Protected _controller As Controller

#Region " Web Form Designer Generated Code "

    'This call is required by the Web Form Designer.
    <System.Diagnostics.DebuggerStepThrough()> Private Sub _
                                                  InitializeComponent()

    End Sub

    Private Sub Page_Init(ByVal sender As System.Object, _
                          ByVal e As System.EventArgs) Handles MyBase.Init
        'CODEGEN: This method call is required by the Web Form Designer
        'Do not modify it using the code editor.
        InitializeComponent()
    End Sub

#End Region

    'ViewWeb_Load will occur automatically when the .aspx page loads
    Private Sub ViewWeb_Load(ByVal sender As Object, _
                         ByVal e As System.EventArgs) Handles MyBase.Load
        'get concrete ControllerFactory class
        Dim controllerFactory As ControllerFactory = getControllerFactory()
        'createController is called and no viewArgs are passed
        If Not controllerFactory Is Nothing Then
            _controller = controllerFactory.createController(Me, Nothing)
        End If
    End Sub

    Protected Overridable Function getControllerFactory() _
                                                   As ControllerFactory
        'subclass must implement and return a concrete ControllerFactory class
    End Function
End Class
