Option Strict On

Imports MVC

Public Class OrderView
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
    Friend WithEvents Label1 As System.Windows.Forms.Label
    Friend WithEvents Label2 As System.Windows.Forms.Label
    Friend WithEvents Label3 As System.Windows.Forms.Label
    Friend WithEvents customerIDText As System.Windows.Forms.TextBox
    Friend WithEvents orderDateText As System.Windows.Forms.TextBox
    Friend WithEvents productsGrid As System.Windows.Forms.DataGrid
    Friend WithEvents orderButton As System.Windows.Forms.Button
    Friend WithEvents productsGridTableStyle As System.Windows.Forms.DataGridTableStyle
    Friend WithEvents nameColumn As System.Windows.Forms.DataGridTextBoxColumn
    Friend WithEvents quantityColumn As System.Windows.Forms.DataGridTextBoxColumn
    Friend WithEvents priceColumn As System.Windows.Forms.DataGridTextBoxColumn
    Friend WithEvents requiredDateColumn As System.Windows.Forms.DataGridTextBoxColumn
    <System.Diagnostics.DebuggerStepThrough()> Private Sub InitializeComponent()
        Me.Label1 = New System.Windows.Forms.Label()
        Me.Label2 = New System.Windows.Forms.Label()
        Me.Label3 = New System.Windows.Forms.Label()
        Me.customerIDText = New System.Windows.Forms.TextBox()
        Me.orderDateText = New System.Windows.Forms.TextBox()
        Me.productsGrid = New System.Windows.Forms.DataGrid()
        Me.orderButton = New System.Windows.Forms.Button()
        Me.productsGridTableStyle = New System.Windows.Forms.DataGridTableStyle()
        Me.nameColumn = New System.Windows.Forms.DataGridTextBoxColumn()
        Me.quantityColumn = New System.Windows.Forms.DataGridTextBoxColumn()
        Me.priceColumn = New System.Windows.Forms.DataGridTextBoxColumn()
        Me.requiredDateColumn = New System.Windows.Forms.DataGridTextBoxColumn()
        CType(Me.productsGrid, System.ComponentModel.ISupportInitialize).BeginInit()
        Me.SuspendLayout()
        '
        'Label1
        '
        Me.Label1.Location = New System.Drawing.Point(8, 8)
        Me.Label1.Name = "Label1"
        Me.Label1.TabIndex = 0
        Me.Label1.Text = "Customer ID"
        '
        'Label2
        '
        Me.Label2.Location = New System.Drawing.Point(8, 56)
        Me.Label2.Name = "Label2"
        Me.Label2.TabIndex = 1
        Me.Label2.Text = "Order Date"
        '
        'Label3
        '
        Me.Label3.Location = New System.Drawing.Point(8, 104)
        Me.Label3.Name = "Label3"
        Me.Label3.TabIndex = 2
        Me.Label3.Text = "Products"
        '
        'customerIDText
        '
        Me.customerIDText.Location = New System.Drawing.Point(8, 24)
        Me.customerIDText.Name = "customerIDText"
        Me.customerIDText.Size = New System.Drawing.Size(224, 20)
        Me.customerIDText.TabIndex = 3
        Me.customerIDText.Text = ""
        '
        'orderDateText
        '
        Me.orderDateText.Location = New System.Drawing.Point(8, 72)
        Me.orderDateText.Name = "orderDateText"
        Me.orderDateText.Size = New System.Drawing.Size(224, 20)
        Me.orderDateText.TabIndex = 4
        Me.orderDateText.Text = ""
        '
        'productsGrid
        '
        Me.productsGrid.DataMember = ""
        Me.productsGrid.HeaderForeColor = System.Drawing.SystemColors.ControlText
        Me.productsGrid.Location = New System.Drawing.Point(8, 120)
        Me.productsGrid.Name = "productsGrid"
        Me.productsGrid.Size = New System.Drawing.Size(392, 112)
        Me.productsGrid.TabIndex = 5
        Me.productsGrid.TableStyles.AddRange(New System.Windows.Forms.DataGridTableStyle() {Me.productsGridTableStyle})
        '
        'orderButton
        '
        Me.orderButton.Location = New System.Drawing.Point(312, 240)
        Me.orderButton.Name = "orderButton"
        Me.orderButton.Size = New System.Drawing.Size(88, 32)
        Me.orderButton.TabIndex = 6
        Me.orderButton.Text = "Order"
        '
        'productsGridTableStyle
        '
        Me.productsGridTableStyle.DataGrid = Me.productsGrid
        Me.productsGridTableStyle.GridColumnStyles.AddRange(New System.Windows.Forms.DataGridColumnStyle() {Me.nameColumn, Me.quantityColumn, Me.priceColumn, Me.requiredDateColumn})
        Me.productsGridTableStyle.HeaderForeColor = System.Drawing.SystemColors.ControlText
        Me.productsGridTableStyle.MappingName = "Product"
        '
        'nameColumn
        '
        Me.nameColumn.Format = ""
        Me.nameColumn.FormatInfo = Nothing
        Me.nameColumn.HeaderText = "Name"
        Me.nameColumn.MappingName = "Name"
        Me.nameColumn.Width = 75
        '
        'quantityColumn
        '
        Me.quantityColumn.Format = ""
        Me.quantityColumn.FormatInfo = Nothing
        Me.quantityColumn.HeaderText = "Quantity"
        Me.quantityColumn.MappingName = "Qty"
        Me.quantityColumn.Width = 75
        '
        'priceColumn
        '
        Me.priceColumn.Format = ""
        Me.priceColumn.FormatInfo = Nothing
        Me.priceColumn.HeaderText = "Price"
        Me.priceColumn.MappingName = "Price"
        Me.priceColumn.Width = 75
        '
        'requiredDateColumn
        '
        Me.requiredDateColumn.Format = ""
        Me.requiredDateColumn.FormatInfo = Nothing
        Me.requiredDateColumn.HeaderText = "Required Date"
        Me.requiredDateColumn.MappingName = "RequiredDate"
        Me.requiredDateColumn.Width = 75
        '
        'OrderView
        '
        Me.AutoScaleBaseSize = New System.Drawing.Size(5, 13)
        Me.ClientSize = New System.Drawing.Size(408, 277)
        Me.Controls.AddRange(New System.Windows.Forms.Control() {Me.orderButton, Me.productsGrid, Me.orderDateText, Me.customerIDText, Me.Label3, Me.Label2, Me.Label1})
        Me.Name = "OrderView"
        Me.Text = "Order"
        CType(Me.productsGrid, System.ComponentModel.ISupportInitialize).EndInit()
        Me.ResumeLayout(False)

    End Sub

#End Region

    Protected Overrides Function getControllerFactory() As ControllerFactory
        Return New OrderControllerFactory()
    End Function

End Class
