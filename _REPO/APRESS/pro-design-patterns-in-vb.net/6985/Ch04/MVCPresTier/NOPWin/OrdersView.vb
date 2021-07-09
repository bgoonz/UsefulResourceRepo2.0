Option Strict On

Imports MVC

Public Class OrdersView
    Inherits MVC.ViewWin

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
    Friend WithEvents ordersGrid As System.Windows.Forms.DataGrid
    Friend WithEvents viewOrderButton As System.Windows.Forms.Button
    Friend WithEvents orderAllButton As System.Windows.Forms.Button
    Friend WithEvents ordersGridTableStyle As System.Windows.Forms.DataGridTableStyle
    Friend WithEvents customerIDColumn As System.Windows.Forms.DataGridTextBoxColumn
    Friend WithEvents orderDateColumn As System.Windows.Forms.DataGridTextBoxColumn
    Friend WithEvents orderTypeColumn As System.Windows.Forms.DataGridTextBoxColumn
    <System.Diagnostics.DebuggerStepThrough()> Private Sub InitializeComponent()
        Me.ordersGrid = New System.Windows.Forms.DataGrid()
        Me.viewOrderButton = New System.Windows.Forms.Button()
        Me.orderAllButton = New System.Windows.Forms.Button()
        Me.ordersGridTableStyle = New System.Windows.Forms.DataGridTableStyle()
        Me.customerIDColumn = New System.Windows.Forms.DataGridTextBoxColumn()
        Me.orderDateColumn = New System.Windows.Forms.DataGridTextBoxColumn()
        Me.orderTypeColumn = New System.Windows.Forms.DataGridTextBoxColumn()
        CType(Me.ordersGrid, System.ComponentModel.ISupportInitialize).BeginInit()
        Me.SuspendLayout()
        '
        'ordersGrid
        '
        Me.ordersGrid.DataMember = ""
        Me.ordersGrid.HeaderForeColor = System.Drawing.SystemColors.ControlText
        Me.ordersGrid.Location = New System.Drawing.Point(8, 8)
        Me.ordersGrid.Name = "ordersGrid"
        Me.ordersGrid.Size = New System.Drawing.Size(296, 216)
        Me.ordersGrid.TabIndex = 0
        Me.ordersGrid.TableStyles.AddRange(New System.Windows.Forms.DataGridTableStyle() {Me.ordersGridTableStyle})
        '
        'viewOrderButton
        '
        Me.viewOrderButton.Location = New System.Drawing.Point(312, 8)
        Me.viewOrderButton.Name = "viewOrderButton"
        Me.viewOrderButton.Size = New System.Drawing.Size(96, 32)
        Me.viewOrderButton.TabIndex = 1
        Me.viewOrderButton.Text = "View Order"
        '
        'orderAllButton
        '
        Me.orderAllButton.Location = New System.Drawing.Point(312, 192)
        Me.orderAllButton.Name = "orderAllButton"
        Me.orderAllButton.Size = New System.Drawing.Size(96, 32)
        Me.orderAllButton.TabIndex = 2
        Me.orderAllButton.Text = "Order All"
        '
        'ordersGridTableStyle
        '
        Me.ordersGridTableStyle.DataGrid = Me.ordersGrid
        Me.ordersGridTableStyle.GridColumnStyles.AddRange(New System.Windows.Forms.DataGridColumnStyle() {Me.customerIDColumn, Me.orderDateColumn, Me.orderTypeColumn})
        Me.ordersGridTableStyle.HeaderForeColor = System.Drawing.SystemColors.ControlText
        Me.ordersGridTableStyle.MappingName = "Order"
        '
        'customerIDColumn
        '
        Me.customerIDColumn.Format = ""
        Me.customerIDColumn.FormatInfo = Nothing
        Me.customerIDColumn.HeaderText = "Customer ID"
        Me.customerIDColumn.MappingName = "CustomerID"
        Me.customerIDColumn.Width = 75
        '
        'orderDateColumn
        '
        Me.orderDateColumn.Format = ""
        Me.orderDateColumn.FormatInfo = Nothing
        Me.orderDateColumn.HeaderText = "Order Date"
        Me.orderDateColumn.MappingName = "OrderDate"
        Me.orderDateColumn.Width = 75
        '
        'orderTypeColumn
        '
        Me.orderTypeColumn.Format = ""
        Me.orderTypeColumn.FormatInfo = Nothing
        Me.orderTypeColumn.HeaderText = "Order Type"
        Me.orderTypeColumn.MappingName = "OrderType"
        Me.orderTypeColumn.Width = 75
        '
        'OrdersView
        '
        Me.AutoScaleBaseSize = New System.Drawing.Size(5, 13)
        Me.ClientSize = New System.Drawing.Size(416, 229)
        Me.Controls.AddRange(New System.Windows.Forms.Control() {Me.orderAllButton, Me.viewOrderButton, Me.ordersGrid})
        Me.Name = "OrdersView"
        Me.Text = "Orders"
        CType(Me.ordersGrid, System.ComponentModel.ISupportInitialize).EndInit()
        Me.ResumeLayout(False)

    End Sub

#End Region

    Protected Overrides Function getControllerFactory() As ControllerFactory
        Return New OrdersControllerFactory()
    End Function


End Class
