Imports NWDSA

Public Class NWDSAWindowsTestApp
    Inherits System.Windows.Forms.Form

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
    Friend WithEvents btnDataSetTest As System.Windows.Forms.Button
    Friend WithEvents btnDataReaderTest As System.Windows.Forms.Button
    Friend WithEvents dgOrders As System.Windows.Forms.DataGrid
    Friend WithEvents lstOrders As System.Windows.Forms.ListView
    Friend WithEvents OrderID As System.Windows.Forms.ColumnHeader
    Friend WithEvents OrderDate As System.Windows.Forms.ColumnHeader
    Friend WithEvents RequiredDate As System.Windows.Forms.ColumnHeader
    Friend WithEvents ShippedDate As System.Windows.Forms.ColumnHeader
    Friend WithEvents txtCustomerID As System.Windows.Forms.TextBox
    <System.Diagnostics.DebuggerStepThrough()> Private Sub InitializeComponent()
        Me.Label1 = New System.Windows.Forms.Label()
        Me.txtCustomerID = New System.Windows.Forms.TextBox()
        Me.btnDataSetTest = New System.Windows.Forms.Button()
        Me.btnDataReaderTest = New System.Windows.Forms.Button()
        Me.dgOrders = New System.Windows.Forms.DataGrid()
        Me.lstOrders = New System.Windows.Forms.ListView()
        Me.OrderID = New System.Windows.Forms.ColumnHeader()
        Me.OrderDate = New System.Windows.Forms.ColumnHeader()
        Me.RequiredDate = New System.Windows.Forms.ColumnHeader()
        Me.ShippedDate = New System.Windows.Forms.ColumnHeader()
        CType(Me.dgOrders, System.ComponentModel.ISupportInitialize).BeginInit()
        Me.SuspendLayout()
        '
        'Label1
        '
        Me.Label1.Location = New System.Drawing.Point(8, 16)
        Me.Label1.Name = "Label1"
        Me.Label1.Size = New System.Drawing.Size(80, 16)
        Me.Label1.TabIndex = 0
        Me.Label1.Text = "Customer ID:"
        '
        'txtCustomerID
        '
        Me.txtCustomerID.Location = New System.Drawing.Point(80, 8)
        Me.txtCustomerID.Name = "txtCustomerID"
        Me.txtCustomerID.TabIndex = 1
        Me.txtCustomerID.Text = "ALFKI"
        '
        'btnDataSetTest
        '
        Me.btnDataSetTest.Location = New System.Drawing.Point(328, 40)
        Me.btnDataSetTest.Name = "btnDataSetTest"
        Me.btnDataSetTest.Size = New System.Drawing.Size(104, 23)
        Me.btnDataSetTest.TabIndex = 2
        Me.btnDataSetTest.Text = "DataSet Test"
        '
        'btnDataReaderTest
        '
        Me.btnDataReaderTest.Location = New System.Drawing.Point(8, 40)
        Me.btnDataReaderTest.Name = "btnDataReaderTest"
        Me.btnDataReaderTest.Size = New System.Drawing.Size(104, 23)
        Me.btnDataReaderTest.TabIndex = 5
        Me.btnDataReaderTest.Text = "DataReader Test"
        '
        'dgOrders
        '
        Me.dgOrders.DataMember = ""
        Me.dgOrders.HeaderForeColor = System.Drawing.SystemColors.ControlText
        Me.dgOrders.Location = New System.Drawing.Point(328, 72)
        Me.dgOrders.Name = "dgOrders"
        Me.dgOrders.Size = New System.Drawing.Size(328, 176)
        Me.dgOrders.TabIndex = 8
        '
        'lstOrders
        '
        Me.lstOrders.Columns.AddRange(New System.Windows.Forms.ColumnHeader() {Me.OrderID, Me.OrderDate, Me.RequiredDate, Me.ShippedDate})
        Me.lstOrders.Location = New System.Drawing.Point(8, 72)
        Me.lstOrders.Name = "lstOrders"
        Me.lstOrders.Size = New System.Drawing.Size(312, 176)
        Me.lstOrders.TabIndex = 9
        Me.lstOrders.View = System.Windows.Forms.View.Details
        '
        'OrderID
        '
        Me.OrderID.Text = "Order ID"
        Me.OrderID.Width = 55
        '
        'OrderDate
        '
        Me.OrderDate.Text = "Order Date"
        Me.OrderDate.Width = 67
        '
        'RequiredDate
        '
        Me.RequiredDate.Text = "Required Date"
        Me.RequiredDate.Width = 85
        '
        'ShippedDate
        '
        Me.ShippedDate.Text = "Shipped Date"
        Me.ShippedDate.Width = 81
        '
        'NWDSAWindowsTestApp
        '
        Me.AutoScaleBaseSize = New System.Drawing.Size(5, 13)
        Me.ClientSize = New System.Drawing.Size(664, 253)
        Me.Controls.AddRange(New System.Windows.Forms.Control() {Me.lstOrders, Me.dgOrders, Me.btnDataReaderTest, Me.btnDataSetTest, Me.txtCustomerID, Me.Label1})
        Me.Name = "NWDSAWindowsTestApp"
        Me.Text = "NWDSAWindowsTestApp"
        CType(Me.dgOrders, System.ComponentModel.ISupportInitialize).EndInit()
        Me.ResumeLayout(False)

    End Sub

#End Region



    Private Sub btnDataReaderTest_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles btnDataReaderTest.Click
        Dim oRequest As New NWDSARequest()
        Dim oParam As New NWDSARequest.Parameter()
        Dim oFactory As NWDSAAbstractFactory
        Dim oDataReader As NWDSADataReader
        Dim drOrders As IDataReader
        Dim oItem As ListViewItem

        ' Select the appropriate Concrete Factory to match your connection string (here and in btnDataSetTest_Click)
        oFactory = New NWDSASqlFactory()
        'oFactory = New NWDSAOleDbFactory()
        'oFactory = New NWDSAOdbcFactory()

        With oRequest
            .Command = "CustOrdersOrders"
            .CommandType = CommandType.StoredProcedure

            oParam.ParamName = "@CustomerID"
            oParam.ParamValue = txtCustomerID.Text.Trim()

            .Parameters.Add(oParam)
            .Role = NWDSARequest.UserRole.Internal
            .Transactional = False
        End With

        oDataReader = oFactory.ExecuteDataReader(oRequest)
        drOrders = oDataReader.ReturnedDataReader

        Do While drOrders.Read()
            oItem = New ListViewItem(drOrders.GetInt32(0))
            oItem.SubItems.Add(drOrders.GetDateTime(1))
            oItem.SubItems.Add(drOrders.GetDateTime(2))
            oItem.SubItems.Add(drOrders.GetDateTime(3))

            lstOrders.Items.Add(oItem)
        Loop
        drOrders.Close()
    End Sub



    Private Sub btnDataSetTest_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles btnDataSetTest.Click
        Dim oRequest As New NWDSARequest()
        Dim oParam As New NWDSARequest.Parameter()
        Dim oFactory As NWDSAAbstractFactory
        Dim oDataSet As NWDSADataSet
        Dim dsOrders As DataSet

        ' Select the appropriate Concrete Factory to match your connection string (here and in btnDataReaderTest_Click)
        oFactory = New NWDSASqlFactory()
        'oFactory = New NWDSAOleDbFactory()
        'oFactory = New NWDSAOdbcFactory()

        With oRequest
            .Command = "CustOrdersOrders"
            .CommandType = CommandType.StoredProcedure

            oParam.ParamName = "@CustomerID"
            oParam.ParamValue = txtCustomerID.Text.Trim()

            .Parameters.Add(oParam)
            .Role = NWDSARequest.UserRole.Internal
            .Transactional = False
        End With

        oDataSet = oFactory.ExecuteDataSet(oRequest)
        dsOrders = oDataSet.ReturnedDataSet

        dgOrders.SetDataBinding(dsOrders, "Table")
        dgOrders.Refresh()
    End Sub
End Class
