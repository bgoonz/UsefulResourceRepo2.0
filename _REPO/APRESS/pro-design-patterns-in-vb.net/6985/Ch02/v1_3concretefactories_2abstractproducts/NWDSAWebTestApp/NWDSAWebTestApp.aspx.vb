Imports NWDSA

Public Class NWDSAWebTestApp
    Inherits System.Web.UI.Page
    Protected WithEvents Label1 As System.Web.UI.WebControls.Label
    Protected WithEvents Label2 As System.Web.UI.WebControls.Label
    Protected WithEvents txtCustomerID As System.Web.UI.WebControls.TextBox
    Protected WithEvents btnGetOrders As System.Web.UI.WebControls.Button
    Protected WithEvents dgOrders As System.Web.UI.WebControls.DataGrid

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

    Private Sub Page_Load(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Load
        'Put user code to initialize the page here
    End Sub

    Private Sub btnGetOrders_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles btnGetOrders.Click

        Dim oRequest As New NWDSARequest()
        Dim oParam As New NWDSARequest.Parameter()
        Dim oFactory As NWDSAAbstractFactory
        Dim oDataSet As NWDSADataSet
        Dim dsOrders As DataSet

        oFactory = New NWDSASqlFactory()
        'oFactory = New NWDSAOleDbFactory()
        'oFactory = New NWDSAOdbcFactory()

        With oRequest
            .Command = "CustOrdersOrders"
            .CommandType = CommandType.StoredProcedure

            oParam.ParamName = "@CustomerID"
            oParam.ParamValue = txtCustomerID.Text.Trim

            .Parameters.Add(oParam)
            .Role = NWDSARequest.UserRole.External
            .Transactional = False
        End With

        oDataSet = oFactory.ExecuteDataSet(oRequest)
        dsOrders = oDataSet.ReturnedDataSet

        Try

            dgOrders.DataSource = dsOrders
            dgOrders.DataBind()

        Catch ex As Exception

            Console.WriteLine(ex.Message)
        End Try


    End Sub
End Class
